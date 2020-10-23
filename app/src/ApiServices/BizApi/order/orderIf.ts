import OrderIf, { config } from "@packages/api/lib/proxy/BizApi/order/orderIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findOrders(Params: any[]): Promise<IApiResponse> {
  return OrderIf[config.Actions.findOrders](Params)
}
export function findOrderDetails(Params: any[]): Promise<IApiResponse> {
  return OrderIf[config.Actions.findOrderDetails](Params)
}
export function findOrderLineWiseBalance(Params: any[]): Promise<IApiResponse> {
  return OrderIf[config.Actions.findOrderLineWiseBalance](Params)
}
export function findCreditMemosOrderLines(Params: any[]): Promise<IApiResponse> {
  return OrderIf[config.Actions.findCreditMemosOrderLines](Params)
}
