import HRUserService, { config } from "@packages/api/lib/proxy/Service/HRUserService"

export function getAllUsers(): Promise<[any, any]> {
  return HRUserService[config.Actions.getAllUsers]({})
}
