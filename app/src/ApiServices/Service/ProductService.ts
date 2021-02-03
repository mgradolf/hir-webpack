import ProductService, { config } from "@packages/api/lib/proxy/Service/ProductService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchProducts(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProductService[config.Actions.searchProducts](Params, Headers)
}

export function getProductFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProductService[config.Actions.getProductFinancials](Params, Headers)
}
