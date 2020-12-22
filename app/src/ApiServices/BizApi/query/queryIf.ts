import QueryIf, { config } from "@packages/api/lib/proxy/BizApi/query/queryIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function analyzeOrdersByDate(Params: { [key: string]: any }, from?: number, to?: number): Promise<IApiResponse> {
  const methodToCall =
    from && to ? config.Actions.executeDomainListWithPagination : config.Actions.executeDomainListWithoutPagination
  return QueryIf[methodToCall](["analytics.analyzeOrdersByDate", Params, from, to])
}

export function analyzePaymentsByDate(Params: { [key: string]: any }, from: number, to: number): Promise<IApiResponse> {
  const methodToCall =
    from && to ? config.Actions.executeDomainListWithPagination : config.Actions.executeDomainListWithoutPagination
  return QueryIf[methodToCall](["analytics.analyzePaymentsByDate", Params, from, to])
}

export function analyzeRegistrationActivityByDate(
  Params: { [key: string]: any },
  from?: number,
  to?: number
): Promise<IApiResponse> {
  const methodToCall =
    from && to ? config.Actions.executeDomainListWithPagination : config.Actions.executeDomainListWithoutPagination
  return QueryIf[methodToCall]([
    "analytics.analyzeRegistrtionActivityByDate",
    {
      SectionRosterStatusCodeID: 1,
      ...Params
    },
    from,
    to
  ])
}

export function findEnrollmentHistory(Params: any) {
  return QueryIf[config.Actions.findEnrollmentHistory]([Params])
}
