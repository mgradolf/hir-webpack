import common from './commons'
import callApi from '~/utils/call_api'

export async function addOrRemoveOfferingToCatalog(
  OfferingID: number,
  CatalogIDs: Array<number>
): Promise<any> {
  const requestConfig = common
  requestConfig.data = {
    ...requestConfig.data,
    Action: 'addOrRemoveOfferingToCatalog',
    Params: {
      OfferingID,
      CatalogIDs
    }
  }

  console.log(requestConfig)
  const response = await callApi(requestConfig)
  return response
}
