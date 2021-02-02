import membershipIF, { config } from "@packages/api/lib/proxy/BizApi/membership/membershipIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findMembershipBeneficiaries(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return membershipIF[config.Actions.findMembershipBeneficiaries]([Params.MembershipTermID, Params.PersonID], Headers)
}

export function findMebershipTerms(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return membershipIF[config.Actions.findMebershipTerms]([Params.MembershipID], Headers)
}
