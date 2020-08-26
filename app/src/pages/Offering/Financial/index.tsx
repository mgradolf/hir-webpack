import React, { useState, useEffect } from "react"

import { RouteComponentProps } from "react-router"
import { Row, Col, Table, Typography, Space } from "antd"
import { searchOfferingFinancial } from "~/ApiServices/Service/OfferingService"
import styles from "~/pages/Offering/Financial/Financial.module.scss"

import OfferingFinancialModalOpenButton from "~/component/Offering/Financial/OfferingFinancialModalOpenButton"
import FinancialEditLink from "~/component/Offering/Financial/FinancialEditLink"
import FinancialRemoveLink from "~/component/Offering/Financial/FinancialRemoveLink"
import { eventBus, REFRESH_OFFERING_FINANCIAL_PAGE } from "~/utils/EventBus"

const { Title } = Typography

function OfferingFinancialPage(props: RouteComponentProps<{ id: string }>) {
  const columns = [
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "Category",
      dataIndex: "FinancialCategoryType"
    },
    {
      title: "Basis",
      dataIndex: "FinancialBasisType"
    },
    {
      title: "Amount",
      dataIndex: "ItemUnitAmount"
    },
    {
      title: "Type",
      dataIndex: "FinancialType"
    },
    {
      title: "Optional?",
      dataIndex: "IsOptional",
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "Taxable?",
      dataIndex: "IsTaxable",
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "Weight",
      dataIndex: "Weight"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "GL Account",
      dataIndex: "GLAccount"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <FinancialEditLink offeringId={record.ApplyToID} financialId={record.FinancialID} />
          <FinancialRemoveLink offeringId={record.ApplyToID} financialId={record.FinancialID} />
        </Space>
      )
    }
  ]

  const offeringID = props.match.params.id
  const [loading, setLoading] = useState<boolean>(false)
  const [offeringFinancialItems, setOfferingFinancialItems] = useState<Array<any>>([])

  useEffect(() => {
    const loadOfferingFinancials = async function () {
      setLoading(true)

      const result = await searchOfferingFinancial(Number(offeringID))

      if (result && result.success) {
        setLoading(false)
        setOfferingFinancialItems(
          result.data.map((x: any, index: number) => {
            x.key = index
            return x
          })
        )
      }
    }
    eventBus.subscribe(REFRESH_OFFERING_FINANCIAL_PAGE, loadOfferingFinancials)
    eventBus.publish(REFRESH_OFFERING_FINANCIAL_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_FINANCIAL_PAGE)
    }
  }, [offeringID])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Offering Financial</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <OfferingFinancialModalOpenButton offeringId={parseInt(offeringID)} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
        <Col className={`gutter-row ${styles.offeringFinancialDetails}`} xs={24} sm={24} md={24}>
          <Table
            columns={columns}
            dataSource={offeringFinancialItems}
            loading={loading}
            bordered
            pagination={{ position: ["topLeft"] }}
            scroll={{ x: "fit-content" }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default OfferingFinancialPage
