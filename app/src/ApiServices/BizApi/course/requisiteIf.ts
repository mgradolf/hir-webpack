import RequisiteIf, { config } from "@packages/api/lib/proxy/BizApi/course/requisiteIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering requisite section                              */
/* -------------------------------------------------------------------------- */
export function removeOfferingRequisiteGroup(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequisiteIf[config.Actions.deleteGroup](Params)
}

export function removeOfferingFromRequisiteGroup(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequisiteIf[config.Actions.deleteOfferingFromGroup](Params)
}
