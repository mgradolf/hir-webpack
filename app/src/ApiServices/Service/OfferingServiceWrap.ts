import OfferingService, { config } from "@packages/api/lib/proxy/Service/OfferingService"
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export function createOfferingWrap(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.createOffering](Params)
}

export function updateOfferingWrap(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.updateOffering](Params)
}

export function searchOfferingWrap(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.searchOffering](Params)
}

export function addOrRemoveOfferingToCatalogWrap(OfferingID: number, CatalogIDs: Array<number>): Promise<[any, any]> {
  return OfferingService[config.Actions.addOrRemoveOfferingToCatalog]({
    OfferingID,
    CatalogIDs
  })
}

/* -------------------------------------------------------------------------- */
/*                         offering financial section                         */
/* -------------------------------------------------------------------------- */
export function createOfferingFinancialWrap(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.createOfferingFinancial](Params)
}

export function updateOfferingFinancialWrap(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.updateOfferingFinancial](Params)
}

export function searchOfferingFinancialWrap(OfferingID: number): Promise<[any, any]> {
  return OfferingService[config.Actions.searchOfferingFinancial]({ OfferingID })
}
