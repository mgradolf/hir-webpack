import ProductIf, { config } from "@packages/api/lib/proxy/BizApi/product/productIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering requisite section                              */
/* -------------------------------------------------------------------------- */
export function addSectionProduct(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProductIf[config.Actions.addSectionProduct](Params)
}

export function findSectionProducts(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProductIf[config.Actions.findSectionProducts]([Params])
}

export function findProductFinancials(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProductIf[config.Actions.findProductFinancials](Params)
}

export function deleteSectionProduct(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProductIf[config.Actions.deleteSectionProduct](Params)
}

export function findSellerFulfillers(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ProductIf[config.Actions.findSellerFulfillers]([Params["Name"], Params["Description"]])
}
