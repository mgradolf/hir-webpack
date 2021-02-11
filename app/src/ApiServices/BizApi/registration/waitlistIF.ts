import WaitlistIF, { config } from "@packages/api/lib/proxy/BizApi/registration/waitlistIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findWaitListEntries(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  if (Params.RequesterRecipientPersonID1) {
    Params.RequesterRecipientPersonID2 = Params.RequesterRecipientPersonID1
  }
  return WaitlistIF[config.Actions.findWaitListEntries]([Params], Headers)
}
