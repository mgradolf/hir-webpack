import ProductIf, { config } from "@packages/api/lib/proxy/BizApi/product/productIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function addSectionProduct(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProductIf[config.Actions.addSectionProduct](Params, Headers)
}

export function findSectionProducts(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProductIf[config.Actions.findSectionProducts]([Params], Headers)
}

export function findProductFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProductIf[config.Actions.findProductFinancials](Params, Headers)
}

export function deleteSectionProduct(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProductIf[config.Actions.deleteSectionProduct](Params, Headers)
}

export function findSellerFulfillers(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return ProductIf[config.Actions.findSellerFulfillers]([Params["Name"], Params["Description"]], Headers)
}
