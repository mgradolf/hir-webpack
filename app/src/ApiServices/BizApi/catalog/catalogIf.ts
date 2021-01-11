import CatalogIf, { config } from "@packages/api/lib/proxy/BizApi/catalog/catalogIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export function findCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogIf[config.Actions.findCatalogs]([Params])
}

export function updateBulkContent(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogIf[config.Actions.updateBulkContent](Params)
}

export function searchCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogIf[config.Actions.searchCatalog]([Params])
}

export function getWebCatalogOfferings(Params: any): Promise<IApiResponse> {
  return CatalogIf[config.Actions.getWebCatalogOfferings]([Params])
}

export function getWebCatalogSections(...Params: any): Promise<IApiResponse> {
  return CatalogIf[config.Actions.getWebCatalogSections](Params)
}

export function getWebCatalogPrograms(Params: any): Promise<IApiResponse> {
  return CatalogIf[config.Actions.getWebCatalogPrograms]([Params])
}
