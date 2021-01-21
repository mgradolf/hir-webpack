import MembershipService, { config } from "@packages/api/lib/proxy/Service/MembershipService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getMembershipCollection(Params: { [key: string]: any }): Promise<IApiResponse> {
  if (Params["EmailAddress"]) {
    Params["EmailAddress2"] = Params["EmailAddress"]
  }
  if (Params["IsRenewed"] === "No") {
    Params["IsRenewed2"] = false
    delete Params["IsRenewed"]
  } else if (Params["IsRenewed"] === "Yes") {
    Params["IsRenewed"] = true
  }
  return MembershipService[config.Actions.getMembershipCollection](Params)
}
