import WaitlistEntryService, { config } from "@packages/api/lib/proxy/Service/WaitlistEntryService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function saveWaitListEntry(Params: { [key: string]: any }): Promise<IApiResponse> {
  return WaitlistEntryService[config.Actions.saveWaitListEntry](Params)
}

export function deleteWaitListEntry(Params: { [key: string]: any }): Promise<IApiResponse> {
  return WaitlistEntryService[config.Actions.deleteWaitListEntry](Params)
}
