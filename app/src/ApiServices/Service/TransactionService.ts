import TransactionService, { config } from "@packages/api/lib/proxy/Service/TransactionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getBaseTransactionTypes(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return TransactionService[config.Actions.getBaseTransactionTypes](Params, Headers)
}

export function getTransactionTypes(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return TransactionService[config.Actions.getTransactionTypes](Params, Headers)
}

export function searchTransactions(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return TransactionService[config.Actions.searchTransactions](Params, Headers)
}

export function credit(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return TransactionService[config.Actions.credit](Params, Headers)
}

export function debit(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return TransactionService[config.Actions.debit](Params, Headers)
}

export function transfer(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return TransactionService[config.Actions.transfer](Params, Headers)
}
