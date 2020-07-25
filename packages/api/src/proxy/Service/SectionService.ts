import { ApiConfig } from '../../utils/api_config_model'
import { getToken } from '../../utils/token_manage'
import callApi from '../../utils/call_api'

const commonConfigs: ApiConfig = {
  url: 'api/hirServlet',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    Service: 'OfferingService'
  }
}

/* -------------------------------------------------------------------------- */
/*                        affiliated orgs for seatgroup                       */
/* -------------------------------------------------------------------------- */
export const findAffiliatedOrgsForSeatGroup = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'findAffiliatedOrgsForSeatGroup', Params)
export const getPaymentGatewayAccount = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'getPaymentGatewayAccount', Params)
export const getSeatGroupsBySection = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'getSeatGroupsBySection', Params)
export const getCoordinator = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'getCoordinator', Params)
export const updateSectionDetails = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'updateSectionDetails', Params)
export const saveAffiliatedOrg = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'saveAffiliatedOrg', Params)
export const updateSectionNotification = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'updateSectionNotification', Params)
export const SectionNoticeID = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'SectionNoticeID', Params)
export const findSectionNoticeRecipients = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'findSectionNoticeRecipients', Params)
export const updateSectionFinancialMaps = (Params: any): Promise<any> =>
  callApi(commonConfigs, 'updateSectionFinancialMaps', Params)
