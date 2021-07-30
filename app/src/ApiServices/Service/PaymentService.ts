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

export function addOrderItemsToPay(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentService[config.Actions.addOrderItemsToPay](Params, Headers)
}

export function setCustomPaymentAmount(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentService[config.Actions.setCustomPaymentAmount](Params, Headers)
}

export function isPaymentReversible(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentService[config.Actions.isPaymentReversible](Params, Headers)
}

export function reversePayment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PaymentService[config.Actions.reversePayment](Params, Headers)
}
