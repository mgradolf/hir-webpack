import React, { useState, useEffect } from "react"
import moment from "moment"
import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Space, Dropdown, Menu } from "antd"
import { getMeetings } from "~/ApiServices/Service/SectionService"
import styles from "~/Pages/Section/Schedule/Schedule.module.scss"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"
import ScheduleMenu from "~/Component/Section/Schedule/ScheduleMenu"
import ScheduleCreateModal from "~/Component/Section/Schedule/ScheduleCreateModal"
import UpdateLocationModal from "~/Component/Section/Schedule/UpdateLocationModal"
import UpdateInstructorModal from "~/Component/Section/Schedule/UpdateInstructorModal"
import UpdateNoteModal from "~/Component/Section/Schedule/UpdateNoteModal"
import { DownOutlined } from "@ant-design/icons"

const { Title } = Typography

function SectionSchedulePage(props: RouteComponentProps<{ id: string }>) {
  const columns = [
    {
      title: "Day",
      dataIndex: "DayOfWeek"
    },
    {
      title: "Date",
      dataIndex: "MeetingDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Start",
      dataIndex: "StartTime",
      render: (text: any) => (text !== null ? moment(text).format("hh:mm A") : "")
    },
    {
      title: "End",
      dataIndex: "EndTime",
      render: (text: any) => (text !== null ? moment(text).format("hh:mm A") : "")
    },
    {
      title: "Meeting Type",
      dataIndex: "MeetingTypeName"
    },
    {
      title: "Location",
      dataIndex: "LocationSummary"
    },
    {
      title: "Instructor",
      dataIndex: "InstructorSummary"
    },
    {
      title: "Notes",
      dataIndex: "Description"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Dropdown
            overlay={<ScheduleMenu sectionId={record.SectionID} scheduleId={record.ScheduleID} />}
            trigger={["click"]}
          >
            <a href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Others <DownOutlined />
            </a>
          </Dropdown>
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
              <Col span="10">Date:</Col>
              <Col span="14">{data.MeetingDate ? moment(data.MeetingDate).format("YYYY-MM-DD") : ""}</Col>
            </Row>

            <Row>
              <Col span="10">Start:</Col>
              <Col span="14">{data.StartTime ? moment(data.StartTime).format("HH:mm A") : ""}</Col>
            </Row>

            <Row>
              <Col span="10">End:</Col>
              <Col span="14">{data.EndTime ? moment(data.EndTime).format("HH:mm A") : ""}</Col>
            </Row>

            <Row>
              <Col span="10">Meeting Type:</Col>
              <Col span="14">{data.MeetingTypeName}</Col>
            </Row>

            <Row>
              <Col span="10">Location:</Col>
              <Col span="14">{data.LocationSummary}</Col>
            </Row>

            <Row>
              <Col span="10">Instructor:</Col>
              <Col span="14">{data.InstructorSummary}</Col>
            </Row>

            <Row>
              <Col span="10">Notes:</Col>
              <Col span="14">{data.Description}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  const sectionID = props.match.params.id
  const [loading, setLoading] = useState<boolean>(false)
  const [sectionScheduleItems, setSectionScheduleItems] = useState<Array<any>>([])
  const [schedueIDs, setScheduleIDs] = useState<Array<any>>([])

  useEffect(() => {
    const loadSectionSchedules = async function () {
      setLoading(true)

      const result = await getMeetings(Number(sectionID))

      if (result && result.success) {
        setLoading(false)
        setSectionScheduleItems(
          result.data.map((x: any, index: number) => {
            x.key = index
            return x
          })
        )
      }
    }
    eventBus.subscribe(REFRESH_SECTION_SCHEDULE_PAGE, loadSectionSchedules)
    eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_SCHEDULE_PAGE)
    }
  }, [sectionID])

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      const rowData = [...selectedRows]
      const rowIDs: number[] = []
      rowData.forEach((key) => {
        rowIDs.push(key.ScheduleID)
      })
      setScheduleIDs(rowIDs)
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <ScheduleCreateModal sectionId={parseInt(sectionID)} scheduleIds={schedueIDs} />
      </Menu.Item>
      <Menu.Item>
        <UpdateLocationModal scheduleIds={schedueIDs} />
      </Menu.Item>
      <Menu.Item>
        <UpdateInstructorModal scheduleIds={schedueIDs} />
      </Menu.Item>
      <Menu.Item>
        <UpdateNoteModal scheduleIds={schedueIDs} />
      </Menu.Item>
    </Menu>
  )

  const removeMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          Schedule
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          Location
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          Instructor
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          Notes
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Schedule</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <ScheduleCreateModal sectionId={parseInt(sectionID)} />
          <Dropdown.Button
            disabled={schedueIDs.length > 0 ? false : true}
            overlay={menu}
            type="primary"
            style={{ marginLeft: "5px" }}
          >
            Updates
          </Dropdown.Button>
          <Dropdown.Button
            disabled={schedueIDs.length > 0 ? true : true}
            overlay={removeMenu}
            type="primary"
            style={{ marginLeft: "5px" }}
          >
            Removes
          </Dropdown.Button>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.sectionSeatGroupDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            dataSource={sectionScheduleItems}
            loading={loading}
            rowKey="ScheduleID"
            rowSelection={rowSelection}
            expandableRowRender={expandableRowRender}
            bordered
            pagination={{ position: ["topLeft"], pageSize: 20 }}
            breakpoints={["md", "lg", "xl", "xxl"]}
            responsiveColumnIndices={[1, 2, 3, 4, 5, 6, 7]}
            scroll={{ y: 600 }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default SectionSchedulePage
