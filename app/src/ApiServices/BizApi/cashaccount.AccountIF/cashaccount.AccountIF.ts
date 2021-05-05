import AccountIf, { config } from "@packages/api/lib/proxy/BizApi/cashaccount.AccountIF/cashaccount.AccountIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getDepositList(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountIf[config.Actions.getDepositList]([Params.PersonID], Headers)
}
