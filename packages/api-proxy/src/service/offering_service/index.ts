import { config } from '../../utils/api_config_model'
import callApi from '../../utils/call_api'
import { getToken } from '../../utils/token_manage'

const common: config = {
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

export async function addOrRemoveOfferingToCatalog(
  OfferingID: number,
  CatalogIDs: Array<number>
): Promise<[any, any]> {
  const requestConfig = common
  requestConfig.data = {
    ...requestConfig.data,
    Action: 'addOrRemoveOfferingToCatalog',
    Params: {
      OfferingID,
      CatalogIDs
    }
  }

  return callApi(requestConfig)
}
