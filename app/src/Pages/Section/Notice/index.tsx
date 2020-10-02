import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Switch } from "antd"
import { getSectionNotices } from "~/ApiServices/Service/RefLookupService"
import styles from "~/Pages/Section/Notice/Notice.module.scss"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import { eventBus, REFRESH_SECTION_NOTIFICATION_PAGE } from "~/utils/EventBus"

const { Title, Text } = Typography

function SectionNoticePage(props: RouteComponentProps<{ sectionID: string }>) {
  const columns = [
    {
      title: "Section Notification Type",
      dataIndex: "Name"
    },
    {
      title: "Published",
      dataIndex: "isPublished",
      render: (text: any, record: any) => (
        <Switch checked={!!text} onChange={(event) => catalogPublished(event)} />
      )
    }
  ]

  const sectionID = props.match.params.sectionID
  console.log("Section ID: ", sectionID)

  const [loading, setLoading] = useState<boolean>(false)
  const [sectionNoticeItems, setSectionNoticeItems] = useState<Array<any>>([])

  async function catalogPublished(event: any) {

  }

  useEffect(() => {
    const loadSectionNotices = async function () {
      setLoading(true)

      const result = await getSectionNotices()

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
            pagination={{ position: ["topLeft"], pageSize: 20 }}
            scroll={{ y: 600 }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default SectionNoticePage
