import * as React from "react"
import { Row, Col, Typography } from "antd"
import SectionFilterOpenButton from "~/Component/Section/SectionFilterOpenButton"
import SectionTable from "~/Component/Section/SectionTable"
import { RouteComponentProps } from "react-router-dom"
import { useSectionFilterState, useSections } from "~/Hooks/Section"
import SectionSearchFilters from "~/Component/Common/SearchFilters"
import SectionSearchFilterMeta from "~/FormMeta/Section/SectionSearchFilterMeta"
import SectionModalOpenButton from "~/Component/Section/CreateEdit/SectionModalOpenButton"
import styles from "~/Pages/Offering/Offering.module.scss"

const { useState } = React
const { Title } = Typography

export default function OfferingPage(props: RouteComponentProps<{ id: string }>) {
  const { filterData, updateFilterData } = useSectionFilterState()
  const [showFilter, setFilterVisiblity] = useState<boolean>(false)
  const [filterCount, setFilterCount] = useState<number>(0)

  const OfferingID = parseInt(props.match.params.id) || undefined
  const [loading, sectionItems] = useSections(filterData, OfferingID)

  const toggleFilter = () => {
    setFilterVisiblity(!showFilter)
  }

  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Manage Sections</Title>
      </Row>
      <SectionFilterOpenButton
        filterCount={filterCount}
        filterColumnVisible={showFilter}
        toggleFilter={toggleFilter}
        actionButton={OfferingID ? <SectionModalOpenButton OfferingID={OfferingID} /> : undefined}
      />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <SectionSearchFilters
          title={""}
          isModalView={false}
          visible={showFilter}
          toggleVisiibility={toggleFilter}
          meta={SectionSearchFilterMeta}
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
          <SectionTable dataSource={sectionItems} loading={loading} />
        </Col>
      </Row>
    </div>
  )
}
