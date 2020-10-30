import * as React from "react"
import { Row, Col, Typography } from "antd"
import { RequestTable } from "~/Component/Section/Request/RequestTable"
import { RouteComponentProps } from "react-router-dom"
import styles from "~/Pages/Request/Request.module.scss"
import { useRequests, useRequestFilterState } from "~/Hooks/Section/Request"
import RequestSearchFilters from "~/Component/Common/SearchFilters"
import RequestSearchFilterMeta from "~/FormMeta/Request/RequestSearchFilterMeta"

import RequestFilterOpenButton from "~/Component/Section/Request/RequestFilterOpenButton"

const { useState } = React
const { Title } = Typography

function RequestPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const { filterData, updateFilterData } = useRequestFilterState()
  const [showFilter, setFilterVisiblity] = useState<boolean>(false)
  const [filterCount, setFilterCount] = useState<number>(0)

  let SectionID: number | undefined = undefined
  if (props.match.params.sectionID) {
    SectionID = Number(props.match.params.sectionID)
  }
  const [loading, requestItems] = useRequests(filterData, SectionID)

  const toggleFilter = () => {
    setFilterVisiblity(!showFilter)
  }

  return (
    <div className="site-layout-content">
      <Row>
        <Title level={3}>Manage Requests</Title>
      </Row>
      <RequestFilterOpenButton
        filterCount={filterCount}
        filterColumnVisible={showFilter}
        toggleFilter={toggleFilter}
        actionButton={undefined}
      />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <RequestSearchFilters
          title={"Request Filter"}
          isModalView={false}
          visible={showFilter}
          hideFilters={toggleFilter}
          meta={RequestSearchFilterMeta}
          initialFilter={filterData}
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
          <RequestTable dataSource={requestItems} loading={loading} sectionId={SectionID} />
        </Col>
      </Row>
    </div>
  )
}
export default RequestPage
