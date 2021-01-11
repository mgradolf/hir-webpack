import MarketingCodeIf, { config } from "@packages/api/lib/proxy/BizApi/marketingCode/marketingCodeIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getMarketingCodeRelatedTagTypes(): Promise<IApiResponse> {
  return MarketingCodeIf[config.Actions.getMarketingCodeRelatedTagTypes]([])
}
