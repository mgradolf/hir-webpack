import ProgramApplicationIf, { config } from "@packages/api/lib/proxy/BizApi/program/programApplicationIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getProgramAppDetails(Params: Array<any>): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.getProgramAppDetails](Params)
}

export function searchProgramApplication(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.searchProgramApplication]([Params])
}
