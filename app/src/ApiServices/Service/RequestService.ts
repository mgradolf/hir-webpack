import RequestService, { config } from "@packages/api/lib/proxy/Service/RequestService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getLiteRequests(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequestService[config.Actions.getLiteRequests](Params)
}
