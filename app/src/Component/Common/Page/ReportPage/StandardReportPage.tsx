import { Row, Typography } from "antd"
import React, { useState } from "react"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import { IField } from "~/Component/Common/Form/common"
import { getToken } from "@packages/api/lib/utils/TokenStore"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"

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
const checkIfFieldParamsAreEmpty = (fieldParams: { [key: string]: any }, defaultParams: { [key: string]: any }) => {
  for (const key in fieldParams) {
    console.log(key, fieldParams, defaultParams)
    if (defaultParams[key] !== undefined) {
      delete fieldParams[key]
    }
  }
  return Object.keys(fieldParams).length === 0
}

export default function StandardReportPage(props: IStandardReportPage) {
  const [downloadUrl, setdownloadUrl] = useState<string>()
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const openReportInNewTab = (params: { [key: string]: any }) => {
    setErrorMessages([])

    Object.keys(params).forEach((key) => {
      if (
        params[key] === null ||
        params[key] === undefined ||
        (typeof params[key] === "string" && params[key].includes("undefined_"))
      ) {
        delete params[key]
      }
    })

    if (props.atLeastOneRequiredfield && checkIfFieldParamsAreEmpty(params, props.defaultFormValue || {})) {
      setErrorMessages([{ message: "Minimum one search field is required!" }])
      setdownloadUrl(undefined)
      return
    }

    let urlParams = `/api/reportServlet?ReportName=${props.reportName}&`
    for (const key in params) {
      if (Array.isArray(params[key]) && params[key].length > 0) {
        urlParams += `${key}=[${params[key]}]&`
      } else {
        console.log(params)
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
      {props.meta && (
        <MetaDrivenForm
          title={<Typography.Title level={3}>{props.title}</Typography.Title>}
          meta={props.meta}
          initialFormValue={props.initialFormValue}
          defaultFormValue={props.defaultFormValue}
          applyButtonLabel="Run Report"
          errorMessages={errorMessages}
          stopProducingQueryParams={true}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            openReportInNewTab(newFilterValues)
          }}
        />
      )}
      {downloadUrl && (
        <Row>
          <iframe title={props.title} style={{ width: "100%", height: "100vh" }} src={downloadUrl} />
        </Row>
      )}
    </div>
  )
}
