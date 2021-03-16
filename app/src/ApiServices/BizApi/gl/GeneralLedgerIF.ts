import GeneralLedgerIF, { config } from "@packages/api/lib/proxy/BizApi/gl/GeneralLedgerIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function saveGLAccountMapping(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return GeneralLedgerIF[config.Actions.saveGLAccountMapping]([Params], Headers)
}

export function findGLAccountMapping(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return GeneralLedgerIF[config.Actions.findGLAccountMapping]([Params.GLAccountID], Headers)
}
