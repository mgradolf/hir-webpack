import OrderService, { config } from "@packages/api/lib/proxy/Service/OrderService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchOrders(Params: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.searchOrders](Params)
}
