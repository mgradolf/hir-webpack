import MailService, { config } from "@packages/api/lib/proxy/Service/MailService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function sendEmail(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return MailService[config.Actions.sendEmail](Params, Headers)
}

export function sendRegistrationConfirmationEmail(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return MailService[config.Actions.sendRegistrationConfirmationEmail](Params, Headers)
}
