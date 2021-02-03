import financialIf, { config } from "@packages/api/lib/proxy/BizApi/financial/financialIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getFinancialsByTarget(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return financialIf[config.Actions.getFinancialsByTarget]([Params], Headers)
}

export function getSectionFinancialDefaultMaps(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return financialIf[config.Actions.getSectionFinancialDefaultMaps]([Params], Headers)
}

export function getSectionFinancialMaps(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return financialIf[config.Actions.getSectionFinancialMaps]([Params], Headers)
}
