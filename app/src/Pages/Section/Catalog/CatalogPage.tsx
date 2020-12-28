import { Col, Row, Switch, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { findCatalog, updateBulkContent } from "~/ApiServices/BizApi/catalog/catalogIf"
import { renderDate, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { eventBus, REFRESH_SECTION_CATALOG_PAGE } from "~/utils/EventBus"

export default function SectionCatalogPage(props: { sectionID: number; title?: string }) {
  const SectionID = props.sectionID
  const [sectionCatalogs, setSectionCatalogs] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadCatalogs = () => {
      setLoading(true)
      findCatalog({ SectionID })
        .then((response) => {
          if (response.success && Array.isArray(response.data)) setSectionCatalogs(response.data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    loadCatalogs()
  }, [SectionID])

  const columns = [
    {
      title: "Published",
      dataIndex: "isPublished",
      key: "catalogName",
      render: (text: any, record: any) => {
        return (
          <Switch
            aria-label="Is Published"
            defaultChecked={record.isPublished}
            onChange={(checked) => {
              const catalogs: Array<any> = []
              sectionCatalogs.forEach((x) => {
                if (checked && x.catalogID === record.catalogID) {
                  catalogs.push(x.catalogID)
                } else if (!checked && x.catalogID === record.catalogID) {
                } else if (x.isPublished) {
                  catalogs.push(x.catalogID)
                }
              })

              updateBulkContent(["Section", SectionID, catalogs]).then((response) => {
                eventBus.publish(REFRESH_SECTION_CATALOG_PAGE)
              })
            }}
          ></Switch>
        )
      }
    },
    {
      title: "Catalog Name",
      dataIndex: "catalogName",
      render: (text: any, record: any) => <Link to={`/catalog/${record.catalogID}`}>{record.catalogName}</Link>,
      key: "catalogName"
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: renderDate
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: renderDate
    },
    {
      title: "Current Status",
      dataIndex: "currentStatus",
      key: "currentStatus"
    }
  ]

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {props.title && (
          <Col className="gutter-row" xs={24} sm={24} md={24}>
            <Typography.Title level={3}>{props.title}</Typography.Title>
          </Col>
        )}
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={"padding-top-10"}>
        <Col className="gutter-row" xs={24} sm={24} md={{ span: 24, offset: 0 }}>
          <ResponsiveTable
            refreshEventName={REFRESH_SECTION_CATALOG_PAGE}
            columns={columns}
            dataSource={sectionCatalogs}
            loading={loading}
            bordered
            pagination={{ position: ["topLeft"], pageSize: 20 }}
            scroll={{ y: 600 }}
            rowKey="catalogID"
          />
        </Col>
      </Row>
    </div>
  )
}
