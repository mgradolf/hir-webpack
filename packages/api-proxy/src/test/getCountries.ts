import { AxiosRequestConfig, AxiosResponse } from 'axios'
import callApi from '~/utils/call_api'

export async function getCountries(): Promise<string> {
  const requestConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_ROOT,
    method: 'GET'
  }
  console.log(requestConfig)

  const response: AxiosResponse = await callApi(requestConfig)
  return response.data
}
