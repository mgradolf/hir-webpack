import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router"
import moment from "moment"
import { Row, Col, Switch, Table, Typography } from "antd"

import { findCatalogWrap } from "~/ApiServices/BizApi/catalog/catalogIf"
import { addOrRemoveOfferingToCatalog } from "~/ApiServices/Service/OfferingService"
import styles from "~/pages/Offering/Financial/Financial.module.scss"

const { Title } = Typography

function OfferingCatalogPage(props: RouteComponentProps<{ id: string }>) {
  const columns = [
    {
      title: "Catalog Name",
      dataIndex: "catalogName"
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (text: any) => (text != null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (text: any) => (text != null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Current Status",
      dataIndex: "currentStatus"
    },
    {
      title: "Published",
      dataIndex: "isPublished",
      render: (text: any, record: any) => (
        <Switch checked={text} onChange={(e) => catalogPublished(e, record.catalogID)} />
      )
    }
  ]

  const [loading, setLoading] = useState<boolean>(false)
  const [offeringCatalogItems, setOfferingCatalogItems] = useState<Array<any>>([])
  const [pendingRowDataSelection, setPendingRowDataSelection] = useState<Array<any>>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([])

  const offeringID = props.match.params.id

  async function catalogPublished(event: any, catalogID: any) {
    const publishedRowData = selectedRowKeys
    if (event) {
      publishedRowData.push(catalogID)
    } else {
      const index = publishedRowData.indexOf(catalogID)
      publishedRowData.splice(index, 1)
    }

    setLoading(true)
    const result = await addOrRemoveOfferingToCatalog(Number(offeringID), publishedRowData)

    if (result && result.success) {
      setLoading(false)
      setPendingRowDataSelection(publishedRowData)
    }
  }

  useEffect(() => {
    async function searchOfferingCatalog() {
      setLoading(true)

      const result = await findCatalogWrap([{ OfferingID: offeringID }])

      if (result && result.success) {
        const publishedRowData = []
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].isPublished) {
            publishedRowData.push(result.data[i].catalogID)
          }
        }
        setLoading(false)
        setOfferingCatalogItems(result.data)
        setSelectedRowKeys(publishedRowData)
      }
    }
    searchOfferingCatalog()
  }, [offeringID, pendingRowDataSelection])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={24}>
          <Title level={3}>Manage Offering Catalogs</Title>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
        <Col className={`gutter-row ${styles.offeringFinancialDetails}`} xs={24} sm={24} md={24}>
          <Table
            columns={columns}
            dataSource={offeringCatalogItems}
            loading={loading}
            bordered
            rowKey="catalogID"
            pagination={{ position: ["topLeft"] }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default OfferingCatalogPage
