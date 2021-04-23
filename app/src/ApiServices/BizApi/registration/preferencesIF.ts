import WaitlistIF, { config } from "@packages/api/lib/proxy/BizApi/registration/preferencesIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getPreference(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return WaitlistIF[config.Actions.getPreference]([Params.PreferenceDefID], Headers)
}
