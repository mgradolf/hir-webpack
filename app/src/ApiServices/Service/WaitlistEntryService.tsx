import WaitlistEntryService, { config } from "@packages/api/lib/proxy/Service/WaitlistEntryService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function saveWaitListEntry(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return WaitlistEntryService[config.Actions.saveWaitListEntry](Params, Headers)
}

export function deleteWaitListEntry(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return WaitlistEntryService[config.Actions.deleteWaitListEntry](Params, Headers)
}
