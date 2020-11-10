import React, { useEffect, useState } from "react"
import StandardReportPage from "~/Component/Common/Page/ReportPage/StandardReportPage"
import {
  DATE_PICKER,
  // DATE_PICKERS,
  IFilterField,
  IFilterFieldType,
  NUMBER,
  TEXT
} from "~/Component/Common/SearchFilters/common"
import { RouteComponentProps } from "react-router-dom"
import { getReportByReportName } from "~/ApiServices/Service/ReportService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
// import meta from "./ReportFormMeta/system.DynamicReportForm"

const generateIfilterFieldObject = (Params: { [key: string]: any }[]): IFilterField[] => {
  const metas: IFilterField[] = []
  Params.forEach((param: any) => {
    if (param.Name === "pUserName" || param.Name === "externalQuery" || param.Name === "SUBREPORT_DIR") return
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

  const loadReportMeta = async () => {
    const preDefinedMeta = await import(`~/Pages/Report/ReportFormMeta/${ReportName}`)
    console.log("preDefinedMeta ", preDefinedMeta)
    const result = await getReportByReportName({ ReportName })
    if (result.success) {
      setReport(result.data)
      if (preDefinedMeta && Array.isArray(preDefinedMeta) && preDefinedMeta.length > 0) {
        setReportMeta(preDefinedMeta)
      } else {
        const metas: IFilterField[] = generateIfilterFieldObject(result.data.Params)
        setReportMeta(metas)
      }
    }
  }
  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadReportMeta)
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
    // eslint-disable-next-line
  }, [ReportName])
  return (
    <StandardReportPage
      title={report.ReportLabel}
      reportName={ReportName}
      description={report.ReportDescription}
      meta={reportMeta}
      initialFilter={{ ReportName }}
    />
  )
}
