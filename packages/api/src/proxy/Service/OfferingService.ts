import callServiceApi from "../../utils/CallServiceApi"
const Module = "hir"
const Service = "OfferingService"

/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export const createOffering = (Params: { [key: string]: any }): Promise<any> => callServiceApi(Service, "createOffering", Params, Module)
export const updateOffering = (Params: { [key: string]: any }): Promise<any> => callServiceApi(Service, "updateOffering", Params, Module)
export const searchOffering = (Params: { [key: string]: any }): Promise<any> => callServiceApi(Service, "searchOffering", Params, Module)
export const addOrRemoveOfferingToCatalog = (Params: { [key: string]: any }): Promise<any> => callServiceApi(Service, "addOrRemoveOfferingToCatalog", Params, Module)

/* -------------------------------------------------------------------------- */
/*                         offering financial section                         */
/* -------------------------------------------------------------------------- */

export const createOfferingFinancial = (Params: { [key: string]: any }): Promise<any> => callServiceApi(Service, "createOfferingFinancial", Params, Module)
export const updateOfferingFinancial = (Params: { [key: string]: any }): Promise<any> => callServiceApi(Service, "updateOfferingFinancial", Params, Module)
export const searchOfferingFinancial = (Params: { [key: string]: any }): Promise<any> => callServiceApi(Service, "searchOfferingFinancial", Params, Module)
