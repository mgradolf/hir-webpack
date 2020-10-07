import React, { useState } from "react"
import { Row, Col, Typography } from "antd"
import WaitListEntryTable from "~/Component/Section/WaitlistEntries/WaitListEntryTable"
import { RouteComponentProps } from "react-router-dom"
import styles from "~/Pages/Offering/Offering.module.scss"
import WaitlistEntriesSearchFilters from "~/Component/Common/SearchFilters"
import WaitlistEntriesSearchFilterMeta from "~/FormMeta/WaitlistEntries/WaitlistEntriesSearchFilterMeta"
import { findWaitListEntries } from "~/ApiServices/BizApi/registration/waitlistIF"

const { Title } = Typography

export default function WaitlistEntriesPage(props: RouteComponentProps) {
  const [waitListEntries, setWaitListEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Waitlist Entries</Title>
      </Row>

      <WaitlistEntriesSearchFilters
        meta={WaitlistEntriesSearchFilterMeta}
        title="Waitlist Entries Filter"
        initialFilter={{}}
        visible={true}
        isChecked={false}
        isModalView
        toggleVisiibility={() => console.log("meo")}
        onApplyChanges={(newFilterValues, appliedFilterCount) => {
          console.log(newFilterValues)
          console.log(appliedFilterCount)
          Object.keys(newFilterValues).forEach((key) => {
            if (newFilterValues[key] === "") delete newFilterValues[key]
          })
          setLoading(true)
          findWaitListEntries([newFilterValues]).then((x) => {
            if (x.success) {
              setWaitListEntries(x.data)
              document.getElementById("WaitListEntryTable")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start"
              })
            }
            setLoading(false)
          })
        }}
      />
      <Col id="WaitListEntryTable" className={`gutter-row ${styles.offeringDetails}`} xs={24} sm={24} md={24}>
        <WaitListEntryTable dataSource={waitListEntries} loading={loading} />
      </Col>
    </div>
  )
}
