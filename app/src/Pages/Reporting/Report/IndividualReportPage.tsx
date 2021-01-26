import React, { useEffect, useState } from "react"
import StandardReportPage from "~/Component/Common/Page/ReportPage/StandardReportPage"
import { DATE_PICKER, IFilterField, IFilterFieldType, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import { RouteComponentProps } from "react-router-dom"
import { getReportByReportName } from "~/ApiServices/Service/ReportService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { Row, Spin } from "antd"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const generateIfilterFieldObject = (Params: { [key: string]: any }[]): IFilterField[] => {
  const metas: IFilterField[] = []
  Params.forEach((param: any) => {
    if (
      param.Name === "pUserName" ||
      param.Name === "externalQuery" ||
      param.Name === "SUBREPORT_DIR" ||
      param.Name === "SchoolName"
    )
      return
    const meta: IFilterField = {
      label: param.Name,
      fieldName: param.Name,
      ariaLabel: param.Name,
      inputType: ((): IFilterFieldType => {
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
  const [reportMeta, setReportMeta] = useState<IFilterField[]>([])
  const [defaultFilters, setDefaultFilters] = useState<{ [key: string]: any }>({})
  const [reportMapping, setReportMapping] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)

  const loadReportMeta = async () => {
    setLoading(true)
    Promise.all([
      import(`~/Pages/Reporting/Report/ReportFormMeta/${ReportName}`),
      getReportByReportName({ ReportName })
    ])
      .then((results) => {
        const fileResponse: IReportMeta = results[0]?.default
        const apiResponse: IApiResponse = results[1]
        if (apiResponse.success) {
          setReport(apiResponse.data)
          if (
            fileResponse &&
            Array.isArray(fileResponse.meta) &&
            (fileResponse.meta.length > 0 ||
              (fileResponse.defaultFilter && Object.keys(fileResponse.defaultFilter).length > 0))
          ) {
            setReportMeta(fileResponse.meta)
            setReportMapping(fileResponse.mapping || {})
            setDefaultFilters(fileResponse.defaultFilter || {})
          } else {
            const metas: IFilterField[] = generateIfilterFieldObject(apiResponse.data.Params)
            setReportMeta(metas)
          }
        }
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
        initialFilter={{ ReportName }}
        defaultFilter={defaultFilters}
        mapping={reportMapping}
      />
    )
  else return <p>Could not find any report with "{ReportName}" title</p>
}
