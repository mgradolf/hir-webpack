import PaymentService, { config } from "@packages/api/lib/proxy/Service/PaymentService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function savePaymentDueDatePolicy(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentService[config.Actions.savePaymentDueDatePolicy](Params, Headers)
}

export function getPaymentDueDatePolicy(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentService[config.Actions.getPaymentDueDatePolicy](Params, Headers)
}
