import StudentService, { config } from "@packages/api/lib/proxy/Service/StudentService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function pushStudent(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return StudentService[config.Actions.pushStudent](Params, Headers)
}

export function removeStudent(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return StudentService[config.Actions.removeStudent](Params, Headers)
}

export function createUpdateStudentHold(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentService[config.Actions.createUpdateStudentHold](Params, Headers)
}

export function releaseStudentHold(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentService[config.Actions.releaseStudentHold](Params, Headers)
}

export function searchOnlineClasses(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentService[config.Actions.searchOnlineClasses](Params, Headers)
}

export function searchStudentSchedule(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentService[config.Actions.searchStudentSchedule](Params, Headers)
}
