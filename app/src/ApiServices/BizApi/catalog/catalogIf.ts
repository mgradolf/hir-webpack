import CatalogBiApi, { config } from "@packages/api/lib/proxy/BizApi/catalog/catalogIf"
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export function findCatalogWrap(Params: { [key: string]: any }): Promise<[any, any]> {
  return CatalogBiApi[config.Actions.findCatalogs](Params)
}
