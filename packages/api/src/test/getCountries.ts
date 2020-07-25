import { ApiConfig } from '../utils/api_config_model'
import callApi from '../utils/call_api'

export function getCountries(): Promise<[any, any]> {
  const requestConfig: ApiConfig = {
    method: 'GET'
  }
  return callApi(requestConfig, undefined, undefined)
}
