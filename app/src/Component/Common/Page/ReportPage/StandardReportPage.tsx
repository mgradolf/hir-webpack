import { Row, Typography } from "antd"
import React, { useState } from "react"
import styles from "~/Component/Offering/OfferingFilterOpenButton.module.scss"
import { CustomForm } from "~/Component/Common/Form"
import { IField } from "~/Component/Common/Form/common"
import { getToken } from "@packages/api/lib/utils/TokenStore"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Document as PDF, Page } from "react-pdf"

export interface IStandardReportPage {
  title: string
  reportName: string
  description?: string
  meta?: IField[]
  initialFormValue?: { [key: string]: string }
  defaultFormValue?: { [key: string]: string }
  mapping?: { [key: string]: any }
  atLeastOneRequiredfield?: boolean
}

export default function StandardReportPage(props: IStandardReportPage) {
  const [downloadUrl, setdownloadUrl] = useState<string>()
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [numberOfPages, setNumberOfPages] = useState(1)
  const openReportInNewTab = (params: { [key: string]: any }) => {
    setErrorMessages([])
    if (props.atLeastOneRequiredfield && Object.keys(params).length === 0) {
      setErrorMessages([{ message: "Minimum one search field is required!" }])
      return
    }
    let urlParams = `/api/reportServlet?ReportName=${props.reportName}&`
    for (const key in params) {
      if (Array.isArray(params[key]) && params[key].length > 0) {
        urlParams += `${key}=[${params[key]}]&`
      } else if (params[key] !== null || params[key] !== undefined) {
        urlParams += `${key}=${params[key]}&`
      }
      if (props.mapping) {
        if (Array.isArray(props.mapping[key]) && props.mapping[key].length > 0) {
          for (const mappingKey of props.mapping[key]) {
            urlParams += `${mappingKey}=${params[key]}&`
          }
        } else if (props.mapping[key]) {
          urlParams += `${props.mapping[key]}=${params[key]}&`
        }
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
            initialFormValue={props.initialFormValue}
            defaultFormValue={props.defaultFormValue}
            applyButtonLabel="Run Report"
            errorMessages={errorMessages}
            onApplyChanges={(newFilterValues, appliedFilterCount) => {
              openReportInNewTab(newFilterValues)
            }}
          />
        )}
      </Row>

      <Row align="middle" justify="center">
        {downloadUrl && (
          <PDF
            error={<div>An error occurred! Please try again with different parameter(s)!</div>}
            file={{
              url: downloadUrl,
              withCredentials: false
            }}
            onLoadSuccess={(result) => {
              setNumberOfPages(result.numPages)
              console.log("result ", result)
            }}
            onLoadError={(error) => {
              console.log("error ", error)
            }}
          >
            <Page pageNumber={numberOfPages}></Page>
          </PDF>
        )}
      </Row>
    </div>
  )
}
