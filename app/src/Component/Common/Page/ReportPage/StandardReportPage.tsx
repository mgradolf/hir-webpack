import { Col, Row, Typography } from "antd"
import React, { useState } from "react"
import { FilterOutlined } from "@ant-design/icons"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import SearchFilters from "~/Component/Common/SearchFilters"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { getToken } from "@packages/api/lib/utils/TokenStore"

export interface IStandardReportPage {
  title: string
  reportName: string
  description?: string
  meta?: IFilterField[]
  initialFilter: { [key: string]: string }
}

export default function StandardReportPage(props: IStandardReportPage) {
  const [filterCount, setFilterCount] = useState(0)
  const [downloadUrl, setdownloadUrl] = useState<string>()

  const openReportInNewTab = (params: { [key: string]: any }) => {
    let urlParams = `/api/reportServlet?ReportName=${props.reportName}&`
    for (const key in params) {
      if (params[key]) urlParams += `${key}=${params[key]}&`
    }
    urlParams += "token=" + getToken()
    setdownloadUrl(urlParams)
    window.open(urlParams, "_blank")
  }
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
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        {props.meta && (
          <SearchFilters
            title={""}
            isModalView={true}
            isCheckeble={false}
            visible={true}
            meta={props.meta}
            initialFilter={props.initialFilter}
            onApplyChanges={(newFilterValues, appliedFilterCount) => {
              openReportInNewTab(newFilterValues)
              setFilterCount(appliedFilterCount)
            }}
          />
        )}
      </Row>
      {downloadUrl && (
        <Row>
          <iframe title={props.title} style={{ width: "100%", height: "100vh" }} src={downloadUrl} />
        </Row>
      )}
    </div>
  )
}
