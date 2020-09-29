import { Col, Row, Switch } from "antd"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { findCatalog, updateBulkContent } from "~/ApiServices/BizApi/catalog/catalogIf"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import { eventBus, REFRESH_SECTION_SEATGROUP_PAGE } from "~/utils/EventBus"

export default function SectionCatalog(props: RouteComponentProps<{ sectionID: string }>) {
  const sectionID = parseInt(props.match.params.sectionID)
  const [sectionCatalogs, setSectionCatalogs] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const loadCatalogs = () => {
      setLoading(true)
      findCatalog([{ SectionID: sectionID }])
        .then((response) => {
          if (response.success) setSectionCatalogs(response.data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    eventBus.subscribe(REFRESH_SECTION_SEATGROUP_PAGE, loadCatalogs)
    eventBus.publish(REFRESH_SECTION_SEATGROUP_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_SEATGROUP_PAGE)
    }
  }, [sectionID])

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
              console.log(record)
              console.log(checked)
              const catalogs: Array<any> = []
              sectionCatalogs.forEach((x) => {
                if (checked && x.catalogID === record.catalogID) {
                  catalogs.push(x.catalogID)
                  console.log(x.isPublished, x.catalogID, checked)
                } else if (!checked && x.catalogID === record.catalogID) {
                  console.log("do nothing")
                } else if (x.isPublished) {
                  catalogs.push(x.catalogID)
                }
              })

              updateBulkContent(["Section", sectionID, catalogs]).then((response) => {
                eventBus.publish(REFRESH_SECTION_SEATGROUP_PAGE)
              })
            }}
          ></Switch>
        )
      }
    },
    {
      title: "Catalog Name",
      dataIndex: "catalogName",
      key: "catalogName"
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Current Status",
      dataIndex: "currentStatus",
      key: "currentStatus"
    }
  ]

  const expandableRowRender = (data: any, mobileView: boolean): JSX.Element => {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {mobileView && (
          <Row>
            <Col span="10">Start Date:</Col>
            <Col span="14">{moment(data.startDate).format("YYYY-MM-DD")}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">End Date:</Col>
            <Col span="14">{moment(data.endDate).format("YYYY-MM-DD")}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Current Status:</Col>
            <Col span="14">{data.currentStatus}</Col>
          </Row>
        )}
      </div>
    )
  }
  return (
    <ResponsiveTable
      columns={columns}
      dataSource={sectionCatalogs}
      loading={loading}
      expandableRowRender={expandableRowRender}
      bordered
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      breakpoints={["md", "lg", "xl", "xxl"]}
      responsiveColumnIndices={[2, 3, 4]}
      scroll={{ y: 600 }}
    />
  )
}
