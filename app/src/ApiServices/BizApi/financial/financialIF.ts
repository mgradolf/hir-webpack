import financialIf, { config } from "@packages/api/lib/proxy/BizApi/financial/financialIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering requisite section                              */
/* -------------------------------------------------------------------------- */
export function getFinancialsByTarget(...args: any): Promise<IApiResponse> {
  return financialIf[config.Actions.getFinancialsByTarget](args)
}
export function getSectionFinancialDefaultMaps(Params: { [key: string]: any }): Promise<IApiResponse> {
  return financialIf[config.Actions.getSectionFinancialDefaultMaps]([Params])
}
export function getSectionFinancialMaps(Params: { [key: string]: any }): Promise<IApiResponse> {
  return financialIf[config.Actions.getSectionFinancialMaps]([Params])
}
