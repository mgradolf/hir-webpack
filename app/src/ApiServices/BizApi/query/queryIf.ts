import QueryIf, { config } from "@packages/api/lib/proxy/BizApi/query/queryIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findEnrollmentHistory(
  Params: { [key: string]: any },
  from?: number,
  to?: number
): Promise<IApiResponse> {
  const methodToCall =
    from && to ? config.Actions.executeDomainListWithPagination : config.Actions.executeDomainListWithoutPagination
  return QueryIf[methodToCall](["jxntm.student.findEnrollmentHistory", Params, from, to])
}

export function findOrderActivity(Params: { [key: string]: any }, from?: number, to?: number): Promise<IApiResponse> {
  const methodToCall =
    from && to ? config.Actions.executeDomainListWithPagination : config.Actions.executeDomainListWithoutPagination
  return QueryIf[methodToCall](["financial.order.findOrderActivity", Params, from, to])
}

export function findPackageDetails(Params: { [key: string]: any }): Promise<IApiResponse> {
  const methodToCall = config.Actions.executeDomainObject
  return QueryIf[methodToCall](["jxntm.packages.findPackageDetails", Params])
}

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

// export function findEnrollmentHistory(Params: any) {
//   return QueryIf[config.Actions.findEnrollmentHistory]([Params])
// }

export function searchPaymentDetailsByPaymentID(Params: any): Promise<IApiResponse> {
  const methodToCall = config.Actions.executeDomainListWithoutPagination
  return QueryIf[methodToCall]([
    "financial.payment.search.searchPaymentDetailsByPaymentID",
    {
      PaymentID: Params.PaymentID
    }
  ])
}

export function findOrganizations(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](["jxntm.organization.findOrganizations", Params, 0, 99999])
}

export function findOrganizationCalendar(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](["jxntm.organization.findOrganizationCalendar", Params, 0, 99999])
}

export function findSystemSchedules(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](["jxntm.system.findSystemSchedules", Params, 0, 99999])
}

export function findGradeScoreDefinitions(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](["jxntm.course.findGradeScoreDefinitions", Params, 0, 99999])
}

export function findBuildings(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](["jxntm.location.findBuildings", Params, 0, 99999])
}

export function findSites(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](["jxntm.location.findSites", Params, 0, 99999])
}

export function findSystemConfiguration(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](["jxntm.system.findSystemConfiguration", Params, 0, 99999])
}

export function findOfferingTypes(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](["jxntm.course.findOfferingTypes", Params, 0, 99999])
}

export function findSectionTypes(Params: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](["jxntm.course.findSectionTypes", Params, 0, 99999])
}
