import OrgIf, { config } from "@packages/api/lib/proxy/BizApi/org/orgIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findSchoolCode(Params: any[]): Promise<IApiResponse> {
  return OrgIf[config.Actions.findSchoolCode](Params)
}
export function getOrganizationByType(Params: any[]): Promise<IApiResponse> {
  return OrgIf[config.Actions.getOrganizationByType](Params)
}
