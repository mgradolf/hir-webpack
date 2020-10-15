import OrderService, { config } from "@packages/api/lib/proxy/Service/OrderService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchOrders(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.searchOrders](Params)
}

export function getOrderDetails(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getOrderDetails](Params)
}

export function getOrderItems(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getOrderItems](Params)
}

export function getOrderLines(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getOrderLines](Params)
}

export function getOrderItemsLit(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getOrderItemsLit](Params)
}

export function getPayment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getPayments](Params)
}

export function getCredit(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getCredits](Params)
}

export function getReturnItem(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getReturnItem](Params)
}

export function getPurchaseOrder(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getPurchaseOrder](Params)
}
