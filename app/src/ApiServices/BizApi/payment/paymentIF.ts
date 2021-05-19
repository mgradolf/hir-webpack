import PaymentIF, { config } from "@packages/api/lib/proxy/BizApi/payment/paymentIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchPayments(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentIF[config.Actions.searchPayment]([Params], Headers)
}

export function searchCreditMemo(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentIF[config.Actions.searchCreditMemo]([Params], Headers)
}

export function getPaymentTypes(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentIF[config.Actions.getPaymentTypes]([Params], Headers)
}

export function generatePaymentAllocation(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentIF[config.Actions.generatePaymentAllocation]([Params], Headers)
}
