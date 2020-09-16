import * as React from "react"
import { Row, Col, Typography } from "antd"
import SectionTable from "~/Component/Section/SectionTable"
import { RouteComponentProps } from "react-router-dom"
import styles from "~/pages/Offering/Offering.module.scss"
import { getOfferingById } from "~/ApiServices/Service/EntityService"
import { searchSection } from "~/ApiServices/BizApi/course/courseIF"
import { useEffect } from "react"

const { useState } = React
const { Title } = Typography

export default function OfferingSections(props: RouteComponentProps<{ id: string }>) {
  const [sectionItems, setSectionItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const offeringID = parseInt(props.match.params.id)
      setLoading(true)
      const response: { [key: string]: any } = await getOfferingById(offeringID)
      if (response.success) {
        const result = await searchSection([{ OfferingID: response.data.OfferingID }])
        if (result.success) {
          setSectionItems(result.data)
        }
      }
      setLoading(false)
    })()
  }, [props.match.params.id])
  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Sections</Title>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.offeringDetails}`} xs={24} sm={24} md={{ span: 24, offset: 0 }}>
          <SectionTable dataSource={sectionItems} loading={loading} />
        </Col>
      </Row>
    </div>
  )
}
