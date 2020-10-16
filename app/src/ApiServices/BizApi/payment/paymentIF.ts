import PaymentIF, { config } from "@packages/api/lib/proxy/BizApi/payment/paymentIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering requisite section                              */
/* -------------------------------------------------------------------------- */
export function searchPayments(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PaymentIF[config.Actions.searchPayment](Params)
}
