import callApi from 'src/call_api'
import { AxiosRequestConfig } from 'axios'

export async function addRmOfferingToCatalogs(
  OfferingID: number
): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: 'api/hirServlet',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      Service: 'OfferingService',
      Action: 'searchOfferingFinancial',
      Params: {
        OfferingID
      }
    }
  }

  const response = await callApi(requestConfig)
  return response
}
