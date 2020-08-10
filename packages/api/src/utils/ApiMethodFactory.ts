import callApi from "./CallApi"
import { getToken } from "./TokenStore"
import { ApiConfig } from "./Interfaces"

function callServiceApi(
  endPoint: string,
  Service: string,
  Action: string,
  Params: any,
  Module?: any
): Promise<[any, any]> {
  const config: ApiConfig = {
    baseURL: process.env.REACT_APP_API_ROOT,
    url: endPoint,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    data: {
      Module,
      Service,
      Action,
      Params
    }
  }
  return callApi(config)
}

type Dictionary = { [key: string]: any }

export interface Iconfig {
  EndPoint: string
  Service: string
  Module: string
  Actions: Dictionary
}

export interface ApiMethod {
  [key: string]: (Params: Dictionary) => Promise<[any, any]>
}

export default (config: Iconfig) => {
  const Actions: ApiMethod = {}
  Object.keys(config.Actions).forEach((Action) => {
    Actions[Action] = (Params: { [key: string]: any }): Promise<[any, any]> =>
      callServiceApi(config.EndPoint, config.Service, Action, Params, config.Module)
  })
  return Actions
}
