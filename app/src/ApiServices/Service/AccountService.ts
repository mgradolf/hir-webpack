import AccountService, { config } from "@packages/api/lib/proxy/Service/AccountService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getAccountAffiliation(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountService[config.Actions.getAccountAffiliation](Params, Headers)
}
export function getAccountByPurchaserID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountService[config.Actions.getAccountByPurchaserID](Params, Headers)
}

export function saveAccountAffiliation(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountService[config.Actions.saveAccountAffiliation](Params, Headers)
}

export function saveAccountRelation(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountService[config.Actions.saveAccountRelation](Params, Headers)
}

export function pushAccount(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return AccountService[config.Actions.pushAccount](Params, Headers)
}

export function pushAccountAffiliation(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountService[config.Actions.pushAccountAffiliation](Params, Headers)
}

export function deleteAccountAffiliation(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountService[config.Actions.deleteAccountAffiliation](Params, Headers)
}

export function getOrCreateAccountForPurchaser(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountService[config.Actions.getOrCreateAccountForPurchaser](Params, Headers)
}
