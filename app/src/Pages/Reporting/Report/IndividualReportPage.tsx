import React, { useEffect, useState } from "react"
import StandardReportPage from "~/Component/Common/Page/ReportPage/StandardReportPage"
import { DATE_PICKER, IField, IFieldType, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { RouteComponentProps } from "react-router-dom"
import { getReportByReportName } from "~/ApiServices/Service/ReportService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { Row, Spin } from "antd"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"

const generateIfilterFieldObject = (Params: { [key: string]: any }[]): IField[] => {
  const metas: IField[] = []
  Params.forEach((param: any) => {
    if (
      param.Name === "pUserName" ||
      param.Name === "externalQuery" ||
      param.Name === "SUBREPORT_DIR" ||
      param.Name === "SchoolName"
    )
      return
    const meta: IField = {
      label: param.Name,
      fieldName: param.Name,
      ariaLabel: param.Name,
      inputType: ((): IFieldType => {
        switch (param.JavaType) {
          case "Integer":
          case "Double":
            return NUMBER
          // case "Boolean":
          //   return BOOLEAN
          // case "Timestamp":
          //   return TEXT
          // case "ArrayList":
          //   return ARRAY
          case "Date":
            return DATE_PICKER
          case "String":
          default:
            return TEXT
        }
      })()
    }
    metas.push(meta)
  })
  return metas
}
export default function IndividualReportPage(props: RouteComponentProps<{ reportName: string }>) {
  const ReportName = props.match.params.reportName
  const [report, setReport] = useState<{ [key: string]: any }>({})
  const [reportMeta, setReportMeta] = useState<IField[]>([])
  const [defaultFormValues, setDefaultFilters] = useState<{ [key: string]: any }>({})
  const [initialFormValues, setInitialFormValues] = useState<{ [key: string]: any }>({ ReportName })
  const [reportMapping, setReportMapping] = useState<{ [key: string]: any }>({})
  const [atLeastOneRequiredfield, setAtLeastOneRequiredfield] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadReportMeta = async () => {
    setLoading(true)
    const apiResponse: IApiResponse = await getReportByReportName({ ReportName })
    console.log("apiResponse : ", apiResponse)

    import(`~/Pages/Reporting/Report/ReportFormMeta/${ReportName}`)
      .then((result) => {
        const fileResponse: IReportMeta = result?.default
        if (apiResponse.success) {
          setReport(apiResponse.data)
          if (
            fileResponse &&
            Array.isArray(fileResponse.meta) &&
            (fileResponse.meta.length > 0 ||
              (fileResponse.defaultFormValue && Object.keys(fileResponse.defaultFormValue).length > 0))
          ) {
            console.log("fileResponse : ", fileResponse)
            setReportMeta(fileResponse.meta)
            setReportMapping(fileResponse.mapping || {})
            setDefaultFilters(fileResponse.defaultFormValue || {})
            fileResponse.initialFormValue &&
              setInitialFormValues({ ...initialFormValues, ...fileResponse.initialFormValue })
            setAtLeastOneRequiredfield(fileResponse.atLeastOneRequiredfield || false)
          } else {
            const metas: IField[] = generateIfilterFieldObject(apiResponse.data.Params)
            setReportMeta(metas)
          }
        }
      })
      .catch((error) => {
        console.log("error in individual report page ", error)
        const metas: IField[] = generateIfilterFieldObject(apiResponse.data.Params)
        console.log("meta after error ", metas)
        setReportMeta(metas)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadReportMeta)
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
    // eslint-disable-next-line
  }, [ReportName])

  if (loading)
    return (
      <Row align="middle" justify="center">
        <Spin size="large" />
      </Row>
    )
  else if (reportMeta && reportMeta.length > 0)
    return (
      <StandardReportPage
        title={report.ReportLabel}
        reportName={ReportName}
        description={report.ReportDescription}
        meta={reportMeta}
        initialFormValue={initialFormValues}
        defaultFormValue={defaultFormValues}
        mapping={reportMapping}
        atLeastOneRequiredfield={atLeastOneRequiredfield}
      />
    )
  else return <p>Could not find any report with "{ReportName}" title</p>
}
