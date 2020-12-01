import { Col, Row, Typography } from "antd"
import React from "react"
import styles from "~/Pages/Section/SeatGroup/Seatgroup.module.scss"
import { RouteComponentProps } from "react-router-dom"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import SectionSeatGroupModalOpenButton from "~/Component/Section/SeatGroup/SectionSeatGroupModalOpenButton"
import { getSeatgroupTableColumns } from "~/FormMeta/Seatgroup/SeatgroupTableColumns"

export default function SeatgroupPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Typography.Title level={3}>Manage Seat Groups</Typography.Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <SectionSeatGroupModalOpenButton sectionId={SectionID} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.sectionSeatGroupDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable {...getSeatgroupTableColumns()} searchParams={{ SectionID }} />
        </Col>
      </Row>
    </div>
  )
}
