import callApi from 'src/call_api'
import { AxiosRequestConfig } from 'axios'

export async function addRmOfferingToCatalogs(
  OfferingID: number,
  CatalogIDs: Array<number>
): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: 'api/bizApiServlet',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      Service: 'OfferingService',
      Action: 'addOrRemoveOfferingToCatalog',
      Params: {
        OfferingID,
        CatalogIDs
      }
    }
  }

  const response = await callApi(requestConfig)
  return response
}
