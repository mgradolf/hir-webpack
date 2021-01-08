import UserService, { config } from "@packages/api/lib/proxy/Service/UserService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findAllUsers(): Promise<IApiResponse> {
  return UserService[config.Actions.findAllUsers]({})
}
export function findUser(Params: any): Promise<IApiResponse> {
  return UserService[config.Actions.findUser](Params)
}
