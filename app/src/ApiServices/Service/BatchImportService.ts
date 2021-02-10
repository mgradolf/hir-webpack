import BatchImportService, { config } from "@packages/api/lib/proxy/Service/BatchImportService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getBatchTypes(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return BatchImportService[config.Actions.getBatchTypes](Params, Headers)
}

export function getStateTypes(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return BatchImportService[config.Actions.getStateTypes](Params, Headers)
}
