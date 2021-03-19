import CatalogIf, { config } from "@packages/api/lib/proxy/BizApi/catalog/catalogIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findCatalog(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogIf[config.Actions.findCatalogs]([Params], Headers)
}

export function updateBulkContent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogIf[config.Actions.updateBulkContent]([Params.Entity, Params.EntityID, Params.Contents], Headers)
}

export function searchCatalog(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogIf[config.Actions.searchCatalog]([Params], Headers)
}

export function getWebCatalogOfferings(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogIf[config.Actions.getWebCatalogOfferings]([Params.CatalogID], Headers)
}

export function getWebCatalogSections(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogIf[config.Actions.getWebCatalogSections]([Params.CatalogID, Params.SelectedOfferingID], Headers)
}

export function getWebCatalogPrograms(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogIf[config.Actions.getWebCatalogPrograms]([Params.CatalogID], Headers)
}
