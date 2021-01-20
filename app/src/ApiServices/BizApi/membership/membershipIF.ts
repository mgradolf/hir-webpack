import membershipIF, { config } from "@packages/api/lib/proxy/BizApi/membership/membershipIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findMembershipBeneficiaries(Params: Array<any>): Promise<IApiResponse> {
  return membershipIF[config.Actions.findMembershipBeneficiaries](Params)
}

export function findMebershipTerms(Params: Array<any>): Promise<IApiResponse> {
  return membershipIF[config.Actions.findMebershipTerms](Params)
}
