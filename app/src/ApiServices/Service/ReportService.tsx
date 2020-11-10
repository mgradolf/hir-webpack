import ReportService, { config } from "@packages/api/lib/proxy/Service/ReportService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getReportList(): Promise<IApiResponse> {
  return ReportService[config.Actions.getReportList]({})
}

export function getReportByReportName(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ReportService[config.Actions.getReportByReportName](Params)
}
