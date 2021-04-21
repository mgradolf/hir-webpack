import ProgramService, { config } from "@packages/api/lib/proxy/Service/ProgramService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function createOrUpdateProgramOffering(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramService[config.Actions.createOrUpdateProgramOffering](Params, Headers)
}

export function saveOrUpdateEmailNotification(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramService[config.Actions.saveOrUpdateEmailNotification](Params, Headers)
}

export function addOrUpdateOfferingRequirement(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramService[config.Actions.addOrUpdateOfferingRequirement](Params, Headers)
}
