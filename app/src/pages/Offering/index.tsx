import * as React from "react"
import { Row, Col, Typography } from "antd"
import { OfferingTable } from "~/Component/Offering/OfferingTable"
import { FilterOpenButton } from "~/Component/Offering/OfferingFilterOpenButton"
import OfferingModalOpenButton from "~/Component/Offering/CreateEdit/OfferingModalOpenButton"
import { RouteComponentProps } from "react-router-dom"
import styles from "~/Pages/Offering/Offering.module.scss"
import { useOfferings, useOfferingFilterState } from "~/Hooks/Offering"
import OfferingSearchFilters from "~/Component/Common/SearchFilters"
import OfferingSearchFilterMeta from "~/FormMeta/Offering/OfferingSearchFilterMeta"

const { useState } = React
const { Title } = Typography

function OfferingPage(props: RouteComponentProps) {
  const { filterData, updateFilterData } = useOfferingFilterState()
  const [showFilter, setFilterVisiblity] = useState<boolean>(false)
  const [filterCount, setFilterCount] = useState<number>(0)

  const [loading, offeringItems] = useOfferings(filterData)

  const toggleFilter = () => {
    setFilterVisiblity(!showFilter)
  }

  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Manage Offerings</Title>
      </Row>
      <FilterOpenButton
        filterCount={filterCount}
        filterColumnVisible={showFilter}
        toggleFilter={toggleFilter}
        actionButton={<OfferingModalOpenButton />}
      />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <OfferingSearchFilters
          meta={OfferingSearchFilterMeta}
          title="Offering Filter"
          isModalView={false}
          visible={showFilter}
          toggleVisiibility={toggleFilter}
          data={filterData}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            updateFilterData({ ...filterData, ...newFilterValues })
            setFilterCount(appliedFilterCount)
            setFilterVisiblity(false)
          }}
        />
        <Col
          className={`gutter-row ${styles.offeringDetails}`}
          xs={24}
          sm={24}
          md={{ span: showFilter ? 17 : 24, offset: showFilter ? 1 : 0 }}
        >
          <OfferingTable dataSource={offeringItems} loading={loading} />
        </Col>
      </Row>
    </div>
  )
}
export default OfferingPage
