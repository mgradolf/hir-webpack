import ProgramIf, { config } from "@packages/api/lib/proxy/BizApi/program/programIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchPrograms(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProgramIf[config.Actions.searchProgram](Params)
}
