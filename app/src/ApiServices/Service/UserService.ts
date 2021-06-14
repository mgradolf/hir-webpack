import UserService, { config } from "@packages/api/lib/proxy/Service/UserService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findAllUsers(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return UserService[config.Actions.findAllUsers](Params, Headers).then((response) => {
    if (response.success) {
      response.data.map((x: any) => {
        x["sortName"] = x.lastName + ", " + x.firstName
        return x
      })
    }
    return response
  })
}

export function findUser(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return UserService[config.Actions.findUser](Params, Headers)
}

export function saveUser(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return UserService[config.Actions.saveUser](Params, Headers)
}

export function findAllUserRoles(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return UserService[config.Actions.findAllUserRoles](Params, Headers)
}

export function changePassword(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return UserService[config.Actions.changePassword](Params, Headers)
}
