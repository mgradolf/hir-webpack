import OfferingService, { config } from "@packages/api/lib/proxy/Service/OfferingService"
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export function createOffering(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.createOffering](Params)
}

export function updateOffering(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.updateOffering](Params)
}

export function searchOffering(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.searchOffering](Params)
}

export function addOrRemoveOfferingToCatalog(OfferingID: number, CatalogIDs: Array<number>): Promise<[any, any]> {
  return OfferingService[config.Actions.addOrRemoveOfferingToCatalog]({
    OfferingID,
    CatalogIDs
  })
}

/* -------------------------------------------------------------------------- */
/*                         offering financial section                         */
/* -------------------------------------------------------------------------- */
export function createOfferingFinancial(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.createOfferingFinancial](Params)
}

export function updateOfferingFinancial(Params: { [key: string]: any }): Promise<[any, any]> {
  return OfferingService[config.Actions.updateOfferingFinancial](Params)
}

export function searchOfferingFinancial(OfferingID: number): Promise<[any, any]> {
  return OfferingService[config.Actions.searchOfferingFinancial]({ OfferingID })
}
