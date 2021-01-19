import ProgramEnrollmentIf, { config } from "@packages/api/lib/proxy/BizApi/program/programEnrollmentIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchEnrollment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProgramEnrollmentIf[config.Actions.searchEnrollment]([Params])
}

export function trackingProgress(Params: Array<any>): Promise<IApiResponse> {
  return ProgramEnrollmentIf[config.Actions.trackingProgress](Params)
}

export function changeEnrollmentStatusWithEvent(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProgramEnrollmentIf[config.Actions.changeEnrollmentStatusWithEvent]([Params])
}
