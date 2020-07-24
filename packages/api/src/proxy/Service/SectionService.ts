import { config } from '../../utils/api_config_model'
import { getToken } from '../../utils/token_manage'
import callApi from '../../utils/call_api'

const commonConfigs: config = {
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

export function findAffiliatedOrgsForSeatGroup(
  SeatGroupID: number
): Promise<[any, any]> {
  const requestConfig: config = commonConfigs
  requestConfig.data = {
    ...requestConfig.data,
    Action: findAffiliatedOrgsForSeatGroup.name,
    Params: {
      SeatGroupID
    }
  }
  return callApi(requestConfig)
}

export function saveAffiliatedOrg(
  SeatGroupID: number,
  AffiliateAccountIDs: number
): Promise<[any, any]> {
  const requestConfig: config = commonConfigs
  requestConfig.data = {
    ...requestConfig.data,
    Action: saveAffiliatedOrg.name,
    Params: {
      SeatGroupID,
      AffiliateAccountIDs
    }
  }
  return callApi(requestConfig)
}
