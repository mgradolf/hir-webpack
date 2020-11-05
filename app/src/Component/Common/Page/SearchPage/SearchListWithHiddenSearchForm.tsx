import { Button, Col, Row, Typography } from "antd"
import React, { useState } from "react"
import { FilterOutlined } from "@ant-design/icons"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import SearchFilters from "~/Component/Common/SearchFilters"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"

export interface ISearchListWithHiddenSearchFormProp {
  blocks?: JSX.Element[]
  title: string
  meta?: IFilterField[]
  tableProps: IDataTableProps
  initialFilter?: { [key: string]: string }
}

export default function SearchListWithHiddenSearchForm(props: ISearchListWithHiddenSearchFormProp) {
  const [filterCount, setFilterCount] = useState(0)
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>(props.initialFilter || {})
  const [showFilter, setShowFilter] = useState(false)
  return (
    <div className="site-layout-content">
      <Row>
        <Typography.Title level={3}>{props.title}</Typography.Title>
      </Row>
      <Row justify="start" gutter={[8, 8]}>
        <Col>
          <span>
            <FilterOutlined />
            <span> {filterCount === 0 ? "No" : filterCount} filters applied</span>
          </span>
        </Col>
      </Row>
      <Row justify="end" gutter={[8, 8]}>
        <Col>
          {!showFilter && (
            <Button type="primary" onClick={() => setShowFilter(true)}>
              Filters
            </Button>
          )}
        </Col>
        {props.blocks && props.blocks.map((x) => <Col>{x}</Col>)}
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        {props.meta && (
          <SearchFilters
            title={""}
            isModalView={false}
            visible={showFilter}
            hideFilters={() => setShowFilter(false)}
            meta={props.meta}
            initialFilter={searchParams}
            onApplyChanges={(newFilterValues, appliedFilterCount) => {
              setSearchParams(newFilterValues)
              setFilterCount(appliedFilterCount)
              setShowFilter(false)
            }}
          />
        )}
        <Col
          className={`gutter-row ${styles.offeringDetails}`}
          xs={24}
          sm={24}
          md={{ span: showFilter ? 17 : 24, offset: showFilter ? 1 : 0 }}
        >
          <ResponsiveTable {...props.tableProps} searchParams={searchParams} />
        </Col>
      </Row>
    </div>
  )
}
