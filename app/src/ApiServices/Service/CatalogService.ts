import CatalogService, { config } from "@packages/api/lib/proxy/Service/CatalogService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchCatalogs(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.searchCatalogs](Params)
}

export function getCatalogContent(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.getCatalogContent](Params)
}

export function addSectionToCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.addSectionToCatalog](Params)
}

export function addOfferingToCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.addOfferingToCatalog](Params)
}

export function addProgramToCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.addProgramToCatalog](Params)
}

export function removeSectionFromCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.removeSectionFromCatalog](Params)
}

export function removeOfferingFromCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.removeOfferingFromCatalog](Params)
}

export function removeProgramFromCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.removeProgramFromCatalog](Params)
}

export function swapProgramsInCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.swapProgramsInCatalog](Params)
}

export function swapSectionsInCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.swapSectionsInCatalog](Params)
}

export function swapOfferingsInCatalog(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CatalogService[config.Actions.swapOfferingsInCatalog](Params)
}
