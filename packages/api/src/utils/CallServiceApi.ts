import callApi from "./CallApi"
import { getToken } from "./TokenStore"
import { ApiConfig } from "./Interfaces"

function callServiceApi(Service: string, Action: string, Params: any, Module?: any): Promise<[any, any]> {
  const config: ApiConfig = {
    baseURL: process.env.REACT_APP_API_ROOT,
    url: "api/hirServlet",
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

interface Iconfig {
  Service: string
  Module: string
  Actions: { [key: string]: string }
}

export interface IAction {
  [key: string]: (Params: { [key: string]: any }) => Promise<[any, any]>
}

export default (config: Iconfig) => {
  const Actions: IAction = {}
  Object.keys(config.Actions).forEach((Action) => {
    Actions[Action] = (Params: { [key: string]: any }): Promise<[any, any]> =>
      callServiceApi(config.Service, Action, Params, config.Module)
  })
  return Actions
}
