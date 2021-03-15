import GradingService, { config } from "@packages/api/lib/proxy/Service/GradingService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function saveCreditType(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return GradingService[config.Actions.saveCreditType](Params, Headers)
}

export function findAvailableCreditType(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return GradingService[config.Actions.findAvailableCreditType](Params, Headers)
}
