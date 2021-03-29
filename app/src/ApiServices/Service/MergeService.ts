import MergeService, { config } from "@packages/api/lib/proxy/Service/MergeService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function analyze(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return MergeService[config.Actions.analyze](Params, Headers)
}

export function analyzeAccount(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return MergeService[config.Actions.analyzeAccount](Params, Headers)
}

export function merge(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return MergeService[config.Actions.merge](Params, Headers)
}

export function mergeAccount(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return MergeService[config.Actions.mergeAccount](Params, Headers)
}
