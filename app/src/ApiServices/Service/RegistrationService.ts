import RegistrationService, { config } from "@packages/api/lib/proxy/Service/RegistrationService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findRegistrations(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.findRegistrations](Params, Headers)
}

export function findRegistrationsWebAdmin(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.findRegistrationsWebAdmin](Params, Headers)
}

export function findRegistrationDetail(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.findRegistrationDetail](Params, Headers)
}

export function getCreditMemoData(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.getCreditMemoData](Params, Headers)
}

export function findGradeScoreDefinition(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.findGradeScoreDefinition](Params, Headers)
}

export function dropWithdrawRegistration(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.dropWithdrawRegistration](Params, Headers)
}

export function dropOrWithdrawRegistration(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.dropOrWithdrawRegistration](Params, Headers)
}

export function deleteRegistration(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.deleteRegistration](Params, Headers)
}

export function editRegistration(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.editRegistration](Params, Headers)
}

export function getGradeDefinitionDetails(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.getGradeDefinitionDetails](Params, Headers)
}

export function saveFinalGrade(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.saveFinalGrade](Params, Headers)
}

export function searchNoShowProcessings(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.searchNoShowProcessings](Params, Headers)
}

export function bulkDropRegistration(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.bulkDropRegistration](Params, Headers)
}

export function bulkDeleteRegistration(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.bulkDeleteRegistration](Params, Headers)
}

export function validateRegistrationRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.validateRegistrationRequest](Params, Headers)
}

export function checkCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.checkCertificate](Params, Headers)
}

export function issueCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.issueCertificate](Params, Headers)
}

export function searchCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.searchCertificate](Params, Headers)
}

export function previewCertificate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RegistrationService[config.Actions.previewCertificate](Params, Headers)
}
