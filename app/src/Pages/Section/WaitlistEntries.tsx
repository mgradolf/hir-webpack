import * as React from "react"
import { Row, Col, Typography } from "antd"
// import WaitListEntryTable from "~/Component/Section/WaitlistEntries/WaitListEntryTable"
import { RouteComponentProps } from "react-router-dom"
import styles from "~/Pages/Offering/Offering.module.scss"
import WaitlistEntriesSearchFilters from "~/Component/Common/SearchFilters"
import WaitlistEntriesSearchFilterMeta from "~/FormMeta/WaitlistEntries/WaitlistEntriesSearchFilterMeta"

const { Title } = Typography

export default function WaitlistEntriesPage(props: RouteComponentProps) {
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
        }}
      />
      <Col className={`gutter-row ${styles.offeringDetails}`} xs={24} sm={24} md={24}>
        {/* <WaitListEntryTable dataSource={offeringItems} loading={loading} /> */}
      </Col>
    </div>
  )
}
