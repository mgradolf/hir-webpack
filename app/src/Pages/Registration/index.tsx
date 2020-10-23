import React, { useEffect, useState } from "react"
import { Row, Col, Typography } from "antd"
import { RouteComponentProps } from "react-router-dom"
import styles from "~/Pages/Registration/Registration.module.scss"
import { findRegistrations } from "~/ApiServices/Service/RegistrationService"
import SectionRegistrationTable from "~/Component/Section/SectionRegistrationTable"

const { Title } = Typography

function RegistrationPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const [registrations, setRegistrations] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)

  let SectionID: number | undefined = undefined
  if (props.match.params.sectionID) {
    SectionID = Number(props.match.params.sectionID)
  }

  useEffect(() => {
    setLoading(true)
    findRegistrations({ SectionID }).then((x) => {
      if (x.success) {
        setRegistrations(
          x.data.map((key: any, index: any) => {
            key.index = index + 1
            return key
          })
        )
      }
      setLoading(false)
    })
  }, [SectionID])

  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Manage Registrations</Title>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.details}`} xs={24} sm={24} md={24}>
          <SectionRegistrationTable dataSource={registrations} loading={loading} />
        </Col>
      </Row>
    </div>
  )
}
export default RegistrationPage
