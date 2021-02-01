import PersonService, { config } from "@packages/api/lib/proxy/Service/PersonService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getPersonDetails(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.getPersonDetails](Params, Headers)
}

export function setUpWebLogin(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.setUpWebLogin](Params, Headers)
}

export function getPersonLogin(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.getPersonLogin](Params, Headers)
}

export function getRegions(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.getRegions](Params, Headers)
}

export function removePersonEducationHistory(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.removePersonEducationHistory](Params, Headers)
}

export function updatePersonEducationHistory(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.updatePersonEducationHistory](Params, Headers)
}

export function createPersonEducationHistory(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.createPersonEducationHistory](Params, Headers)
}

export function findPersonEducationHist(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.findPersonEducationHist](Params, Headers)
}

export function getPersonDisabilities(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.getPersonDisabilities](Params, Headers)
}

export function savePersonDisabilities(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.savePersonDisabilities](Params, Headers)
}

export function getFacultySchedule(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.getFacultySchedule](Params, Headers)
}
