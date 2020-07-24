import { config } from '../utils/api_config_model'
import callApi from '../utils/call_api'

export function getCountries(): Promise<[any, any]> {
  const requestConfig: config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return callApi(requestConfig)
}
