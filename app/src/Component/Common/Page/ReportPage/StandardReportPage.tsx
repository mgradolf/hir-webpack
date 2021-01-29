import { Row, Typography } from "antd"
import React, { useState } from "react"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import { CustomForm } from "~/Component/Common/Form"
import { IField } from "~/Component/Common/Form/common"
import { getToken } from "@packages/api/lib/utils/TokenStore"

export interface IStandardReportPage {
  title: string
  reportName: string
  description?: string
  meta?: IField[]
  initialFilter?: { [key: string]: string }
  defaultFilter?: { [key: string]: string }
  mapping?: { [key: string]: string }
}

export default function StandardReportPage(props: IStandardReportPage) {
  const [downloadUrl, setdownloadUrl] = useState<string>()
  const openReportInNewTab = (params: { [key: string]: any }) => {
    let urlParams = `/api/reportServlet?ReportName=${props.reportName}&`
    for (const key in params) {
      if (Array.isArray(params[key]) && params[key].length > 0) {
        urlParams += `${key}=[${params[key]}]&`
      } else if (params[key] !== null || params[key] !== undefined) {
        urlParams += `${key}=${params[key]}&`
      }
      if (props.mapping && props.mapping[key]) {
        urlParams += `${props.mapping[key]}=${params[key]}&`
      }
    }
    urlParams += "token=" + getToken()
    console.log(urlParams)
    setdownloadUrl(urlParams)
  }
  return (
    <div className="site-layout-content">
      <Row>
        <Typography.Title level={3}>{props.title}</Typography.Title>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        {props.meta && (
          <CustomForm
            meta={props.meta}
            initialFilter={props.initialFilter}
            defaultFilter={props.defaultFilter}
            applyButtonLabel="Run Report"
            onApplyChanges={(newFilterValues, appliedFilterCount) => {
              openReportInNewTab(newFilterValues)
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
