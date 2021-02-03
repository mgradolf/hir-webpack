import RequisiteIf, { config } from "@packages/api/lib/proxy/BizApi/course/requisiteIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function removeOfferingRequisiteGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RequisiteIf[config.Actions.deleteGroup]([Params.RequisiteGroupId], Headers)
}
export function deleteOfferingFromGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RequisiteIf[config.Actions.deleteOfferingFromGroup]([[Params.OfferingID], Params.RequisiteGroupId], Headers)
}
export function addOfferingIntoRequisiteGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RequisiteIf[config.Actions.addOfferingToGroup]([Params.SelectedOfferingIds, Params.RequisiteGroupID], Headers)
}
