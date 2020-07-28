import { ApiConfig } from '../../utils/Interfaces'
import { getToken } from '../../utils/TokenStore'
import callApi from '../../utils/CallApi'

const commonConfigs: ApiConfig = {
  url: 'api/hirServlet',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    Module: 'hir',
    Service: 'OfferingService'
  }
}

/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

export const createOffering = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'createOffering', Params)
export const updateOffering = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'updateOffering', Params)
export const searchOffering = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'searchOffering', Params)
export const addOrRemoveOfferingToCatalog = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'addOrRemoveOfferingToCatalog', Params)

/* -------------------------------------------------------------------------- */
/*                         offering financial section                         */
/* -------------------------------------------------------------------------- */

export const createOfferingFinancial = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'createOfferingFinancial', Params)
export const updateOfferingFinancial = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'updateOfferingFinancial', Params)
export const searchOfferingFinancial = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'searchOfferingFinancial', Params)
