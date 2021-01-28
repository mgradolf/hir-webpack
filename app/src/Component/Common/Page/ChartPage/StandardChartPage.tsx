import { Col, Row, Typography } from "antd"
import React, { useState } from "react"
import { FilterOutlined } from "@ant-design/icons"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import SearchFilters from "~/Component/Common/SearchForm"
import { IField } from "~/Component/Common/SearchForm/common"
import { SimpleBarChart } from "~/Component/Common/Charts/SimpleBarChart"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IChartConfig } from "~/Pages/Reporting/Chart/ChartMeta/IChartConfig"

export interface IStandardReportPage {
  config: IChartConfig
  meta?: IField[]
  searchFunc: (Params: { [key: string]: any }, from?: number, to?: number) => Promise<IApiResponse>
  initialFilter: { [key: string]: string }
}

export default function StandardReportPage(props: IStandardReportPage) {
  const [filterCount, setFilterCount] = useState(0)
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()

  return (
    <div className="site-layout-content">
      <Row>
        <Typography.Title level={3}>{props.config.title}</Typography.Title>
      </Row>
      <Row justify="start" gutter={[8, 8]}>
        <Col>
          <span>
            <FilterOutlined />
            <span> {filterCount === 0 ? "No" : filterCount} filters applied</span>
          </span>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        {props.meta && (
          <SearchFilters
            meta={props.meta}
            initialFilter={props.initialFilter}
            applyButtonLabel="Render Chart"
            clearButtonLabel="Clear Chart"
            onApplyChanges={(newFilterValues, appliedFilterCount) => {
              setFilterCount(appliedFilterCount)
              setSearchParams(newFilterValues)
            }}
          />
        )}
      </Row>

      {props.config.chartType === "simplebarchart" && (
        <SimpleBarChart searchParams={searchParams} searchFunc={props.searchFunc} config={props.config} />
      )}
    </div>
  )
}
