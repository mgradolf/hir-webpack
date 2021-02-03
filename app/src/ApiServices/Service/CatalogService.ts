import CatalogService, { config } from "@packages/api/lib/proxy/Service/CatalogService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchCatalogs(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.searchCatalogs](Params, Headers)
}

export function getCatalogContent(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.getCatalogContent](Params, Headers)
}

export function addSectionToCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.addSectionToCatalog](Params, Headers)
}

export function addOfferingToCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.addOfferingToCatalog](Params, Headers)
}

export function addProgramToCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.addProgramToCatalog](Params, Headers)
}

export function removeSectionFromCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.removeSectionFromCatalog](Params, Headers)
}

export function removeOfferingFromCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.removeOfferingFromCatalog](Params, Headers)
}

export function removeProgramFromCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.removeProgramFromCatalog](Params, Headers)
}

export function swapProgramsInCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.swapProgramsInCatalog](Params, Headers)
}

export function swapSectionsInCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.swapSectionsInCatalog](Params, Headers)
}

export function swapOfferingsInCatalog(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CatalogService[config.Actions.swapOfferingsInCatalog](Params, Headers)
}
