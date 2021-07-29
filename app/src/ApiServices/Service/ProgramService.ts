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

export function addOrUpdateAdmissionRequirement(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramService[config.Actions.addOrUpdateAdmissionRequirement](Params, Headers)
}

export function saveOrUpdateAdmissionRequirementGroups(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramService[config.Actions.saveOrUpdateAdmissionRequirementGroups](Params, Headers)
}

export function addOrUpdateOfferingRequirement(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramService[config.Actions.addOrUpdateOfferingRequirement](Params, Headers)
}

export function saveOrUpdateProgramFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramService[config.Actions.saveOrUpdateProgramFinancial](Params, Headers)
}

export function getProgramDetails(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProgramService[config.Actions.getProgramDetails](Params, Headers)
}
