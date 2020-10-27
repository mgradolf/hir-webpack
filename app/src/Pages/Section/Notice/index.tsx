import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Space } from "antd"
import { getSectionNotifications } from "~/ApiServices/Service/SectionService"
import NoticeEditLink from "~/Component/Section/Notice/NoticeEditLink"
import styles from "~/Pages/Section/Notice/Notice.module.scss"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import { eventBus, REFRESH_SECTION_NOTIFICATION_PAGE } from "~/utils/EventBus"

const { Title } = Typography

function SectionNoticePage(props: RouteComponentProps<{ sectionID: string }>) {
  const columns = [
    {
      title: "Section Notification Type",
      dataIndex: "SectionNoticeType",
      key: "SectionNoticeType"
    },
    {
      title: "From Email Address",
      dataIndex: "FromEmailAddress",
      key: "FromEmailAddress"
    },
    {
      title: "To Email Address",
      dataIndex: "ToEmailAddress",
      key: "ToEmailAddress"
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      key: "IsActive",
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <NoticeEditLink sectionId={parseInt(sectionID)} sectionNoticeTypeId={record.SectionNoticeTypeID} />
        </Space>
      )
    }
  ]

  const expandableRowRender = (data: { [key: string]: any }, display: boolean): JSX.Element => {
    return (
      <>
        {display && (
          <div style={{ border: "1px solid", padding: "5px" }}>
            <Row>
              <Col span="8">From Email Address:</Col>
              <Col span="16">{data.FromEmailAddress}</Col>
            </Row>

            <Row>
              <Col span="8">To Email Address:</Col>
              <Col span="16">{data.ToEmailAddress}</Col>
            </Row>

            <Row>
              <Col span="8">Subject:</Col>
              <Col span="16">{data.Subject}</Col>
            </Row>

            <Row>
              <Col span="8">Active:</Col>
              <Col span="16">{data.IsActive ? "Yes" : "No"}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  const sectionID = props.match.params.sectionID
  console.log("Section ID: ", sectionID)

  const [loading, setLoading] = useState<boolean>(false)
  const [sectionNoticeItems, setSectionNoticeItems] = useState<Array<any>>([])

  useEffect(() => {
    const loadSectionNotices = async function () {
      setLoading(true)

      const result = await getSectionNotifications({ SectionID: Number(sectionID) })
      if (result && result.success) {
        setLoading(false)
        setSectionNoticeItems(result.data)
      }
    }
    eventBus.subscribe(REFRESH_SECTION_NOTIFICATION_PAGE, loadSectionNotices)
    eventBus.publish(REFRESH_SECTION_NOTIFICATION_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_NOTIFICATION_PAGE)
    }
  }, [sectionID])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={24}>
          <Title level={3}>Manage Email Notification</Title>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.sectionSeatGroupDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            dataSource={sectionNoticeItems}
            loading={loading}
            bordered
            rowKey="SectionNoticeID"
            expandableRowRender={expandableRowRender}
            pagination={{ position: ["topLeft"], pageSize: 20 }}
            breakpoints={["md", "lg", "xl", "xxl"]}
            responsiveColumnIndices={[1, 2, 3, 4]}
            scroll={{ y: 600 }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default SectionNoticePage
