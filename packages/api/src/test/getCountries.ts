import { ApiConfig } from '../utils/Interfaces'
import callApi from '../utils/CallApi'

export function getCountries(): Promise<[any, any]> {
  const requestConfig: ApiConfig = {
    method: 'GET'
  }
  return callApi(requestConfig, undefined, undefined)
}
