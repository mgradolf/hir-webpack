import callApi from 'src/call_api'
import { AxiosRequestConfig } from 'axios'

export async function getCatalogs(OfferingID: number): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: 'api/bizApiServlet',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      Service: 'com.jenzabar.jxntm.server.bizapi.catalog.CatalogIF',
      Action: 'findCatalogs',
      Params: [
        {
          OfferingID
        }
      ]
    }
  }

  const response = await callApi(requestConfig)
  return response
}
