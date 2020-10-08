import AccountIf, { config } from "@packages/api/lib/proxy/BizApi/account/accountIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering requisite section                              */
/* -------------------------------------------------------------------------- */
export function findAccountForLookUp(Params: Array<{ [key: string]: any }>): Promise<IApiResponse> {
  return AccountIf[config.Actions.findAccountForLookUp](Params)
}
