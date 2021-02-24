import NTSWebLoginIf, { config } from "@packages/api/lib/proxy/BizApi/NTSWebLogin/NTSWebLoginIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function updateLoginInfo(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return NTSWebLoginIf[config.Actions.updateLoginInfo](
    [Params.PersonID, Params.UserLogin, Params.SecretQuestion, Params.SecretAnswer, Params.IsActivated],
    Headers
  )
}

export function unlockPersonLogin(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return NTSWebLoginIf[config.Actions.unlockPersonLogin]([Params.PersonID], Headers)
}

export function sendPasswordResetEmail(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return NTSWebLoginIf[config.Actions.sendPasswordResetEmail]([Params.PersonID], Headers)
}
