import customQueryIf, { config } from "@packages/api/lib/proxy/BizApi/customQuery/customQueryIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findQueryList(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return customQueryIf[config.Actions.findQueryList]([], Headers)
}

export function getSearchParamList(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return customQueryIf[config.Actions.getParamList]([Params.QueryName], Headers)
}

export function getTableColumnList(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return customQueryIf[config.Actions.getResultList]([Params.QueryName], Headers)
}

export function findQueryResult(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  const { QueryName, ...otherParams } = Params
  return customQueryIf[config.Actions.findQueryResult]([QueryName, otherParams], Headers)
}
