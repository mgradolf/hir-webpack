import callServiceApi from '../../utils/CallServiceApi'

const Module = 'hir'
const Service = 'OfferingService'

/* -------------------------------------------------------------------------- */
/*                        affiliated orgs for seatgroup                       */
/* -------------------------------------------------------------------------- */
export const findAffiliatedOrgsForSeatGroup = (Params: any): Promise<any> =>
  callServiceApi(Service, 'findAffiliatedOrgsForSeatGroup', Params, Module)
export const getPaymentGatewayAccount = (Params: any): Promise<any> =>
  callServiceApi(Service, 'getPaymentGatewayAccount', Params, Module)
export const getSeatGroupsBySection = (Params: any): Promise<any> =>
  callServiceApi(Service, 'getSeatGroupsBySection', Params, Module)
export const getCoordinator = (Params: any): Promise<any> =>
  callServiceApi(Service, 'getCoordinator', Params, Module)
export const updateSectionDetails = (Params: any): Promise<any> =>
  callServiceApi(Service, 'updateSectionDetails', Params, Module)
export const saveAffiliatedOrg = (Params: any): Promise<any> =>
  callServiceApi(Service, 'saveAffiliatedOrg', Params, Module)
export const updateSectionNotification = (Params: any): Promise<any> =>
  callServiceApi(Service, 'updateSectionNotification', Params, Module)
export const SectionNoticeID = (Params: any): Promise<any> =>
  callServiceApi(Service, 'SectionNoticeID', Params, Module)
export const findSectionNoticeRecipients = (Params: any): Promise<any> =>
  callServiceApi(Service, 'findSectionNoticeRecipients', Params, Module)
export const updateSectionFinancialMaps = (Params: any): Promise<any> =>
  callServiceApi(Service, 'updateSectionFinancialMaps', Params, Module)
