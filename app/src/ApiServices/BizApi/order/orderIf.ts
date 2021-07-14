import OrderIf, { config } from "@packages/api/lib/proxy/BizApi/order/orderIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findOrders(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return OrderIf[config.Actions.findOrders]([Params], Headers)
}
export function findOrderDetails(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderIf[config.Actions.findOrderDetails]([Params], Headers)
}
export function getPrintableInvoice(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderIf[config.Actions.getPrintableInvoice]([Params.OrderID], Headers)
}
export function findOrderLineWiseBalance(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderIf[config.Actions.findOrderLineWiseBalance]([Params], Headers)
}
export function findCreditMemosOrderLines(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderIf[config.Actions.findCreditMemosOrderLines]([Params], Headers)
}
