import WaitlistIF, { config } from "@packages/api/lib/proxy/BizApi/registration/waitlistIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findWaitListEntries(Params: Array<{ [key: string]: any }>): Promise<IApiResponse> {
  return WaitlistIF[config.Actions.findWaitListEntries](Params)
}
