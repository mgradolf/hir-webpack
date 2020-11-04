import React, { useState, useEffect } from "react"

import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Space, Dropdown } from "antd"
import { getSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import styles from "~/Pages/Section/SeatGroup/Seatgroup.module.scss"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import SectionSeatGroupModalOpenButton from "~/Component/Section/SeatGroup/SectionSeatGroupModalOpenButton"
import { eventBus, REFRESH_SECTION_SEATGROUP_PAGE } from "~/utils/EventBus"
import SeatGroupMenu from "~/Component/Section/SeatGroup/SeatGroupMenu"
import { DownOutlined } from "@ant-design/icons"

const { Title } = Typography

function SectionSeatgroupPage(props: RouteComponentProps<{ sectionID: string }>) {
  const columns = [
    {
      title: "Seat Group Name",
      dataIndex: "Name"
    },
    {
      title: "Default Seat Group",
      dataIndex: "IsDefault",
      render: (value: boolean) => (value ? "Yes" : "No")
    },
    {
      title: "Total Seats",
      dataIndex: "NumberOfSeats"
    },
    {
      title: "Reserved Seats",
      dataIndex: "ReservedSeats"
    },
    {
      title: "Enrolled Seats",
      dataIndex: "EnrolledSeats"
    },
    {
      title: "Available Seats",
      dataIndex: "AvailableSeats"
    },
    {
      title: "Estimated Seats",
      dataIndex: "EstimatedEnrollment"
    },
    {
      title: "Due Date Policy",
      dataIndex: "DueDatePolicy"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <SeatGroupMenu
                isDefault={record.IsDefault}
                sectionId={record.SectionID}
                programId={record.ProgramID}
                programCode={record.ProgramCode}
                seatgroupId={record.SeatGroupID}
              />
            }
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
              <Col span="10">Default Seat Group:</Col>
              <Col span="14">{data.IsDefault ? "Yes" : "No"}</Col>
            </Row>

            <Row>
              <Col span="10">Total Seats:</Col>
              <Col span="14">{data.NumberOfSeats}</Col>
            </Row>

            <Row>
              <Col span="10">Reserved Seats:</Col>
              <Col span="14">{data.ReservedSeats}</Col>
            </Row>

            <Row>
              <Col span="10">Enrolled Seats:</Col>
              <Col span="14">{data.EnrolledSeats}</Col>
            </Row>

            <Row>
              <Col span="10">Available Seats:</Col>
              <Col span="14">{data.AvailableSeats}</Col>
            </Row>

            <Row>
              <Col span="10">Estimated Seats:</Col>
              <Col span="14">{data.EstimatedEnrollment}</Col>
            </Row>

            <Row>
              <Col span="10">Due Date Policy:</Col>
              <Col span="14">{data.DueDatePolicy}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  const sectionID = props.match.params.sectionID
  const [loading, setLoading] = useState<boolean>(false)
  const [sectionSeatGroupItems, setSectionSeatGroupItems] = useState<Array<any>>([])

  useEffect(() => {
    const loadSectionSeatGroups = async function () {
      setLoading(true)

      const result = await getSeatGroups({ SectionID: Number(sectionID) })

      if (result && result.success) {
        setLoading(false)
        setSectionSeatGroupItems(
          result.data.map((x: any, index: number) => {
            x.key = index
            return x
          })
        )
      }
    }
    eventBus.subscribe(REFRESH_SECTION_SEATGROUP_PAGE, loadSectionSeatGroups)
    eventBus.publish(REFRESH_SECTION_SEATGROUP_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_SEATGROUP_PAGE)
    }
  }, [sectionID])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Seat Groups</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <SectionSeatGroupModalOpenButton sectionId={parseInt(sectionID)} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.sectionSeatGroupDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            columns={columns}
            dataSource={sectionSeatGroupItems}
            loading={loading}
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

export default SectionSeatgroupPage
