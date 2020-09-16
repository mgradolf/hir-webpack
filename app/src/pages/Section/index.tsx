import * as React from "react"
import { Row, Col, Typography } from "antd"
import SelectedFilters from "~/Component/Section/SelectedFilters"
import FilterColumn from "~/Component/Section/FilterColumn"
import SectionTable from "~/Component/Section/SectionTable"
import { RouteComponentProps } from "react-router-dom"
import { useOfferingFilterState, useOfferings } from "~/Hooks/Section"

import styles from "~/pages/Offering/Offering.module.scss"

const { useState } = React
const { Title } = Typography

export default function OfferingPage(props: RouteComponentProps<{ id: string }>) {
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
        <Title level={3}>Manage Sections</Title>
      </Row>
      <SelectedFilters filterCount={filterCount} filterColumnVisible={showFilter} toggleFilter={toggleFilter} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <FilterColumn
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
          <SectionTable dataSource={offeringItems} loading={loading} />
        </Col>
      </Row>
    </div>
  )
}
