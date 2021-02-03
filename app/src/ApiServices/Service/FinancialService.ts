import FinancialService, { config } from "@packages/api/lib/proxy/Service/FinancialService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function createFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return FinancialService[config.Actions.createFinancial](Params, Headers)
}

export function updateFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return FinancialService[config.Actions.updateFinancial](Params, Headers)
}

export function deleteFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return FinancialService[config.Actions.deleteFinancial](Params, Headers)
}

export function searchFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return FinancialService[config.Actions.searchFinancials](Params, Headers)
}

export function searchResourceItem(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return FinancialService[config.Actions.searchResourceItem](Params, Headers)
}

export function searchMarketingProgram(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return FinancialService[config.Actions.searchMarketingProgram](Params, Headers)
}

export function searchDiscountProgram(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return FinancialService[config.Actions.searchDiscountProgram](Params, Headers)
}
