import PersonService, { config } from "@packages/api/lib/proxy/Service/PersonService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getPersonDetails(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.getPersonDetails](Params)
}

export function setUpWebLogin(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.setUpWebLogin](Params)
}

export function getPersonLogin(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.getPersonLogin](Params)
}

export function getRegions(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.getRegions](Params)
}

export function removePersonEducationHistory(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.removePersonEducationHistory](Params)
}

export function updatePersonEducationHistory(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.updatePersonEducationHistory](Params)
}

export function createPersonEducationHistory(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.createPersonEducationHistory](Params)
}

export function findPersonEducationHist(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.findPersonEducationHist](Params)
}

export function getPersonDisabilities(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.getPersonDisabilities](Params)
}

export function savePersonDisabilities(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.savePersonDisabilities](Params)
}

export function getFacultySchedule(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.getFacultySchedule](Params)
}
