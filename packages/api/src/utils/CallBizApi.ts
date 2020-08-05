import callApi from "./CallApi"
import { getToken } from "./TokenStore"
import { ApiConfig } from "./Interfaces"

export default function (Service: string, Action: string, Params: any, Module?: any): Promise<[any, any]> {
  const config: ApiConfig = {
    baseURL: process.env.REACT_APP_API_ROOT,
    url: "api/bizApiServlet",
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
