import AccountService, { config } from "@packages/api/lib/proxy/Service/AccountService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getAccountAffiliation(Params: { [key: string]: any }): Promise<IApiResponse> {
  return AccountService[config.Actions.getAccountAffiliation](Params)
}

export function saveAccountAffiliation(Params: { [key: string]: any }): Promise<IApiResponse> {
  return AccountService[config.Actions.saveAccountAffiliation](Params)
}
