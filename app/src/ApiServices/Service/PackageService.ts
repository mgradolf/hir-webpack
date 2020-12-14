import PackageService, { config } from "@packages/api/lib/proxy/Service/PackageService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findPackages(Params: { [key: string]: any }): Promise<IApiResponse> {
  return PackageService[config.Actions.findPackages](Params)
}
