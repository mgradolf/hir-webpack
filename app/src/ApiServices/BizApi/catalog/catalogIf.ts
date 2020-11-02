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
