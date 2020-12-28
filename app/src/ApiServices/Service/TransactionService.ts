import TransactionService, { config } from "@packages/api/lib/proxy/Service/TransactionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getBaseTransactionTypes(Params: { [key: string]: any }): Promise<IApiResponse> {
  return TransactionService[config.Actions.getBaseTransactionTypes](Params)
}

export function getTransactionTypes(Params: { [key: string]: any }): Promise<IApiResponse> {
  return TransactionService[config.Actions.getTransactionTypes](Params)
}

export function searchTransactions(Params: { [key: string]: any }): Promise<IApiResponse> {
  return TransactionService[config.Actions.searchTransactions](Params)
}
