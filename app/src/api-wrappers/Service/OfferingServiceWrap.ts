import {
  addOrRemoveOfferingToCatalog,
  createOffering,
  updateOffering,
  searchOffering,
  createOfferingFinancial,
  updateOfferingFinancial,
  searchOfferingFinancial
} from '@packages/api/lib/proxy/Service/OfferingService'
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export function createOfferingWrap(Params: {
  [key: string]: any
}): Promise<[any, any]> {
  return createOffering(Params)
}

export function updateOfferingWrap(Params: {
  [key: string]: any
}): Promise<[any, any]> {
  return updateOffering(Params)
}

export function searchOfferingWrap(OfferingCode: string): Promise<[any, any]> {
  return searchOffering({ OfferingCode })
}

export function addOrRemoveOfferingToCatalogWrap(
  OfferingID: number,
  CatalogIDs: Array<number>
): Promise<[any, any]> {
  return addOrRemoveOfferingToCatalog({ OfferingID, CatalogIDs })
}

/* -------------------------------------------------------------------------- */
/*                         offering financial section                         */
/* -------------------------------------------------------------------------- */
export function createOfferingFinancialWrap(Params: {
  [key: string]: any
}): Promise<[any, any]> {
  return createOfferingFinancial(Params)
}

export function updateOfferingFinancialWrap(Params: {
  [key: string]: any
}): Promise<[any, any]> {
  return updateOfferingFinancial(Params)
}

export function searchOfferingFinancialWrap(
  OfferingID: number
): Promise<[any, any]> {
  return searchOfferingFinancial({ OfferingID })
}
