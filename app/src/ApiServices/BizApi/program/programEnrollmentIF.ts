import ProgramEnrollmentIf, { config } from "@packages/api/lib/proxy/BizApi/program/programEnrollmentIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchEnrollment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramEnrollmentIf[config.Actions.searchEnrollment]([Params], Headers)
}

export function trackingProgress(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramEnrollmentIf[config.Actions.trackingProgress](Params, Headers)
}

export function changeEnrollmentStatusWithEvent(
  Params: Array<any>,
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramEnrollmentIf[config.Actions.changeEnrollmentStatusWithEvent](Params, Headers)
}
