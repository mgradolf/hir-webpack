import RequestService, { config } from "@packages/api/lib/proxy/Service/RequestService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getLiteRequests(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequestService[config.Actions.getLiteRequests](Params)
}

export function readRequestForStaff(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequestService[config.Actions.readRequestForStaff](Params)
}

export function getEnumValues(): Promise<IApiResponse> {
  return RequestService[config.Actions.getEnumValues]({
    EnumType: "RequestStateType"
  }).then((x) => {
    if (x.success) {
      x.data = x.data.Values
    }
    return x
  })
}
