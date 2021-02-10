import BatchService, { config } from "@packages/api/lib/proxy/Service/BatchService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findBatches(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return BatchService[config.Actions.findBatches](Params, Headers)
}
