import HRUserService, { config } from "@packages/api/lib/proxy/Service/HRUserService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getAllUsers(): Promise<IApiResponse> {
  return HRUserService[config.Actions.getAllUsers]({})
}
