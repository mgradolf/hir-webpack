import PaymentGatewayService, { config } from "@packages/api/lib/proxy/Service/PaymentGatewayService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findPaymentGatewayActivities(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentGatewayService[config.Actions.findPaymentGatewayActivities](Params, Headers)
}
