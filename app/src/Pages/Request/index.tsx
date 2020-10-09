import * as React from "react"
import { Row, Col, Typography } from "antd"
import { RequestTable } from "~/Component/Section/Request/RequestTable"
import { RouteComponentProps } from "react-router-dom"
import styles from "~/Pages/Request/Request.module.scss"
import { useRequests } from "~/Hooks/Section/Request"

const { Title } = Typography

function RequestPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = parseInt(props.match.params.sectionID)
  const [loading, requestItems] = useRequests(SectionID)

  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Manage Requests</Title>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.offeringDetails}`} xs={24} sm={24} md={{ span: 24, offset: 0 }}>
          <RequestTable dataSource={requestItems} loading={loading} sectionId={SectionID} />
        </Col>
      </Row>
    </div>
  )
}
export default RequestPage
