import ReportService, { config } from "@packages/api/lib/proxy/Service/ReportService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getReportList(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return ReportService[config.Actions.getReportList](Params, Headers)
}

export function getReportByReportName(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ReportService[config.Actions.getReportByReportName](Params, Headers)
}
