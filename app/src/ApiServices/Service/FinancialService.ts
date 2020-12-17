import FinancialService, { config } from "@packages/api/lib/proxy/Service/FinancialService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchDiscountProgram(Params: { [key: string]: any }): Promise<IApiResponse> {
  return FinancialService[config.Actions.searchDiscountProgram](Params)
}
