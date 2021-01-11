import React from "react"
import { Row, Col, Typography } from "antd"
import { RouteComponentProps } from "react-router-dom"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import "~/Sass/utils.scss"

const { Title } = Typography

function RegistrationPage(props: RouteComponentProps<{ sectionID?: string }>) {
  let SectionID: number | undefined = undefined
  if (props.match.params.sectionID) {
    SectionID = Number(props.match.params.sectionID)
  }

  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Manage Registrations</Title>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="padding-top-10">
        <Col className={`gutter-row`} xs={24} sm={24} md={24}>
          <ResponsiveTable {...getRegistrationTableColumns()} searchParams={{ SectionID }} />
        </Col>
      </Row>
    </div>
  )
}
export default RegistrationPage
