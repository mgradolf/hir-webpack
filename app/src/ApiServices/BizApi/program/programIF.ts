import ProgramIf, { config } from "@packages/api/lib/proxy/BizApi/program/programIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchPrograms(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.searchProgram]([Params], Headers)
}

export function searchProgramOffering(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.searchProgramOffering]([Params], Headers)
}

export function deleteProgramOfferingWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.deleteProgramOfferingWithEvent]([Params.ProgramOfferingID], Headers)
}

export function saveProgramWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.saveProgramWithEvent]([Params], Headers)
}

export function copyProgramWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.copyProgramWithEvent]([Params.ProgramID], Headers)
}

export function deleteProgramWithEvent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramIf[config.Actions.deleteProgramWithEvent]([Params.ProgramID], Headers)
}
