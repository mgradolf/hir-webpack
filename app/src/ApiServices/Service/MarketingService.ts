import MarketingService, { config } from "@packages/api/lib/proxy/Service/MarketingService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getMarketingCategory(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return MarketingService[config.Actions.getMarketingCategory](Params, Headers)
}

export function searchMarketingCodeResponses(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return MarketingService[config.Actions.searchMarketingCodeResponses](Params, Headers)
}

export function searchMarketingCodes(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return MarketingService[config.Actions.searchMarketingCodes](Params, Headers)
}
