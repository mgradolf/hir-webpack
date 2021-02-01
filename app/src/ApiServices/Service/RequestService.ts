import RequestService, { config } from "@packages/api/lib/proxy/Service/RequestService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { MAX_PAGE_SIZE, MIN_START_POSITION_SIZE } from "~/utils/Constants"

export function getLiteRequests(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  Params["Headers"] = {
    PageSize: MAX_PAGE_SIZE,
    StartPosition: MIN_START_POSITION_SIZE
  }
  return RequestService[config.Actions.getLiteRequests](Params, Headers)
}

export function readRequestForStaff(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RequestService[config.Actions.readRequestForStaff](Params, Headers)
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
