import BatchImportService, { config } from "@packages/api/lib/proxy/Service/BatchImportService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getBatchTypes(): Promise<IApiResponse> {
  return BatchImportService[config.Actions.getBatchTypes]({})
}

export function getStateTypes(Params: { [key: string]: any }): Promise<IApiResponse> {
  return BatchImportService[config.Actions.getStateTypes](Params)
}
