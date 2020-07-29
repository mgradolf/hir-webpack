import callServiceApi from '../../utils/CallServiceApi'
const Module = 'hir'
const Service = 'OfferingService'

/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export const createOffering = (Params: any): Promise<any> =>
  callServiceApi(Service, 'createOffering', Params, Module)
export const updateOffering = (Params: any): Promise<any> =>
  callServiceApi(Service, 'updateOffering', Params, Module)
export const searchOffering = (Params: any): Promise<any> =>
  callServiceApi(Service, 'searchOffering', Params, Module)
export const addOrRemoveOfferingToCatalog = (Params: any): Promise<any> =>
  callServiceApi(Service, 'addOrRemoveOfferingToCatalog', Params, Module)

/* -------------------------------------------------------------------------- */
/*                         offering financial section                         */
/* -------------------------------------------------------------------------- */

export const createOfferingFinancial = (Params: any): Promise<any> =>
  callServiceApi(Service, 'createOfferingFinancial', Params, Module)
export const updateOfferingFinancial = (Params: any): Promise<any> =>
  callServiceApi(Service, 'updateOfferingFinancial', Params, Module)
export const searchOfferingFinancial = (Params: any): Promise<any> =>
  callServiceApi(Service, 'searchOfferingFinancial', Params, Module)
