import AnonymizationRequestService, { config } from "@packages/api/lib/proxy/Service/AnonymizationRequestService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function createAnonymizationRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AnonymizationRequestService[config.Actions.createAnonymizationRequest](Params, Headers)
}

export function getAnonymizeRequests(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AnonymizationRequestService[config.Actions.getAnonymizeRequests](Params, Headers)
}
