import ProgramApplicationIf, { config } from "@packages/api/lib/proxy/BizApi/program/programApplicationIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function saveApplicationAnswer(Params: Array<any>): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.saveApplicationAnswer](Params)
}

export function getProgramAppDetails(Params: Array<any>): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.getProgramAppDetails](Params)
}

export function searchProgramApplication(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.searchProgramApplication]([Params])
}

export function addApplicationComment(Params: Array<any>): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.addApplicationComment](Params)
}

export function addProgramAdmReqComment(Params: Array<any>): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.addProgramAdmReqComment](Params)
}

export function resubmitProgramAdmReq(Params: Array<any>): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.resubmitProgramAdmReq](Params)
}

export function changeProgramAdmReqStatus(Params: Array<any>): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.changeProgramAdmReqStatus](Params)
}

export function changeApplicationStatusWithEvent(Params: Array<any>): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.changeApplicationStatusWithEvent](Params)
}