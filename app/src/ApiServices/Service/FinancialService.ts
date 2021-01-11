import FinancialService, { config } from "@packages/api/lib/proxy/Service/FinancialService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function createFinancial(Params: { [key: string]: any }): Promise<IApiResponse> {
  return FinancialService[config.Actions.createFinancial](Params)
}

export function updateFinancial(Params: { [key: string]: any }): Promise<IApiResponse> {
  return FinancialService[config.Actions.updateFinancial](Params)
}

export function deleteFinancial(Params: { [key: string]: any }): Promise<IApiResponse> {
  return FinancialService[config.Actions.deleteFinancial](Params)
}

export function searchFinancials(Params: { [key: string]: any }): Promise<IApiResponse> {
  return FinancialService[config.Actions.searchFinancials](Params)
}

export function searchResourceItem(Params: { [key: string]: any }): Promise<IApiResponse> {
  return FinancialService[config.Actions.searchResourceItem](Params)
}

export function searchMarketingProgram(Params: { [key: string]: any }): Promise<IApiResponse> {
  return FinancialService[config.Actions.searchMarketingProgram](Params)
}

export function searchDiscountProgram(Params: { [key: string]: any }): Promise<IApiResponse> {
  return FinancialService[config.Actions.searchDiscountProgram](Params)
}
