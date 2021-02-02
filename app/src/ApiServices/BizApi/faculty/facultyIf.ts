import FacultyIf, { config } from "@packages/api/lib/proxy/BizApi/faculty/facultyIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchFaculties(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return FacultyIf[config.Actions.searchFaculties]([Params], Headers)
}
