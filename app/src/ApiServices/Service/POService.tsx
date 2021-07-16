import PurchaseOrderService, { config } from "@packages/api/lib/proxy/Service/POService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function createOrUpdatePurchaseOrder(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PurchaseOrderService[config.Actions.createOrUpdatePurchaseOrder](Params, Headers)
}

export function receivePurchaseOrder(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PurchaseOrderService[config.Actions.receivePurchaseOrder](Params, Headers)
}

export function removePurchaseOrder(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PurchaseOrderService[config.Actions.removePurchaseOrder](Params, Headers)
}

export function findPurchaseOrders(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PurchaseOrderService[config.Actions.findPurchaseOrders](Params, Headers)
}
