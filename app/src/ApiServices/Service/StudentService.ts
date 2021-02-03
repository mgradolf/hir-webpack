import StudentService, { config } from "@packages/api/lib/proxy/Service/StudentService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

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
