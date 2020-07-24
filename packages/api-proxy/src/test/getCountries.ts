import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export async function getCountries(): Promise<string> {
  const requestConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_ROOT,
    method: 'GET'
  }

  const response: AxiosResponse = await axios.request(requestConfig)
  return response.data
}
