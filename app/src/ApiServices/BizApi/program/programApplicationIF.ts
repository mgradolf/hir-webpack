import ProgramApplicationIf, { config } from "@packages/api/lib/proxy/BizApi/program/programApplicationIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchProgramApplication(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProgramApplicationIf[config.Actions.searchProgramApplication]([Params])
}
