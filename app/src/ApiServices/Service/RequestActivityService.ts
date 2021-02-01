import RequestActivityService, { config } from "@packages/api/lib/proxy/Service/RequestActivityService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function bulkUpdate(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return RequestActivityService[config.Actions.bulkUpdate](Params, Headers)
}

export function makeExternalPayment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RequestActivityService[config.Actions.makeExternalPayment](Params, Headers)
}

export function extendExpirationDate(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RequestActivityService[config.Actions.extendExpirationDate](Params, Headers)
}

export function findPublishedAndActiveQuestionsWithOptions(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return RequestActivityService[config.Actions.findPublishedAndActiveQuestionsWithOptions](Params, Headers)
}
