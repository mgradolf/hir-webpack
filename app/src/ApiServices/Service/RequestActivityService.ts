import RequestActivityService, { config } from "@packages/api/lib/proxy/Service/RequestActivityService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function bulkUpdate(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequestActivityService[config.Actions.bulkUpdate](Params)
}

export function makeExternalPayment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequestActivityService[config.Actions.makeExternalPayment](Params)
}

export function extendExpirationDate(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequestActivityService[config.Actions.extendExpirationDate](Params)
}

export function findPublishedAndActiveQuestionsWithOptions(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RequestActivityService[config.Actions.findPublishedAndActiveQuestionsWithOptions](Params)
}
