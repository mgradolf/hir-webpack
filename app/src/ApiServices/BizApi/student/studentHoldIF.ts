import StudentHoldIF, { config } from "@packages/api/lib/proxy/BizApi/student/studentHoldIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findStudentHold(Params: any, ...args: any): Promise<IApiResponse> {
  return StudentHoldIF[config.Actions.findStudentHold]([Params, null, null, null, null, null, null, null, null, null])
}
