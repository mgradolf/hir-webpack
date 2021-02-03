import StudentHoldIF, { config } from "@packages/api/lib/proxy/BizApi/student/studentHoldIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findStudentHold(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentHoldIF[config.Actions.findStudentHold](
    [Params, null, null, null, null, null, null, null, null, null],
    Headers
  )
}
