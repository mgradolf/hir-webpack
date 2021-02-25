import InstructorService, { config } from "@packages/api/lib/proxy/Service/InstructorService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function pushInstructor(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return InstructorService[config.Actions.pushInstructor](Params, Headers)
}

export function removeInstructor(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return InstructorService[config.Actions.removeInstructor](Params, Headers)
}

export function addInstructorToOffering(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return InstructorService[config.Actions.addInstructorToOffering](Params, Headers)
}

export function pushInstructorSchedule(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return InstructorService[config.Actions.pushInstructorSchedule](Params, Headers)
}

export function removeInstructorFromOffering(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return InstructorService[config.Actions.removeInstructorFromOffering](Params, Headers)
}

export function searchInstructorOfferings(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return InstructorService[config.Actions.searchInstructorOfferings](Params, Headers)
}

export function searchSectionInstructor(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return InstructorService[config.Actions.searchSectionInstructor](Params, Headers)
}
