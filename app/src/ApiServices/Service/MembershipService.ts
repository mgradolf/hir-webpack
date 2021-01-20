import MembershipService, { config } from "@packages/api/lib/proxy/Service/MembershipService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getMembershipCollection(Params: { [key: string]: any }): Promise<IApiResponse> {
  return MembershipService[config.Actions.getMembershipCollection](Params)
}
