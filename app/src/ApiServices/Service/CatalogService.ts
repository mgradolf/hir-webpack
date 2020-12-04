import CatalogService, { config } from "@packages/api/lib/proxy/Service/CatalogService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchCatalogs(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.searchCatalogs](Params)
}
