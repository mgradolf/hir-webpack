import QueryIf, { config } from "@packages/api/lib/proxy/BizApi/query/queryIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { MAX_PAGE_SIZE, MIN_START_POSITION_SIZE } from "~/utils/Constants"

export function findPickList(Params: { [key: string]: any }, from?: number, to?: number): Promise<IApiResponse> {
  return QueryIf[config.Actions.findPickList]([Params.PickListName])
}

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

export function searchPaymentDetailsByPaymentID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  const methodToCall = config.Actions.executeDomainListWithoutPagination
  return QueryIf[methodToCall](
    [
      "financial.payment.search.searchPaymentDetailsByPaymentID",
      {
        PaymentID: Params.PaymentID
      },
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findOrganizations(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.organization.findOrganizations",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findOrganizationCalendar(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.organization.findOrganizationCalendar",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findSystemSchedules(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.system.findSystemSchedules",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findGradeScoreDefinitions(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.course.findGradeScoreDefinitions",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findRooms(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.location.findRooms",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}
export function findBuildings(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.location.findBuildings",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findSites(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.location.findSites",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findSystemConfiguration(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.system.findSystemConfiguration",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findOfferingTypes(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.course.findOfferingTypes",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findSectionTypes(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.course.findSectionTypes",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function searchCertificateParams(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.certificate.searchCertificateParams",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findTermFeeProductsByCategoryID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.registration.findTermFeeProductsByCategoryID",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function getSectionFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.course.findSectionFinancials",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findSectionTypesByOfferingType(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeRowMapNamedQuery](
    ["jxntm.course.AllSectionTypesByOfferingTypeID", Params, null],
    Headers
  )
}

export function findPaymentTypesByReference(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "financial.payment.findPaymentTypesByReference",
      {},
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findDueDatesByItemsSummary(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  // const _Params = {
  //   BalanceMoreThan: Params.BalanceMoreThan,
  //   PersonID: Params.PersonID,
  //   PersonID4: Params.PersonID,
  //   OrganizationID: Params.OrganizationID,
  //   OrganizationID1: Params.OrganizationID,
  //   OrganizationID2: Params.OrganizationID,
  //   OrganizationID3: Params.OrganizationID,
  //   OrganizationID4: Params.OrganizationID,
  //   OrderID: Params.OrderID,
  //   OrderID4: Params.OrderID,
  //   PaymentDueDateTo: Params.PaymentDueDateTo,
  //   PaymentDueDateTo4: Params.PaymentDueDateTo,
  //   PaymentDueDateFrom: Params.PaymentDueDateFrom,
  //   PaymentDueDateFrom4: Params.PaymentDueDateFrom,
  //   DepartmentID: Params.DepartmentID,
  //   OptionalItem: [Params.OptionalItem],
  //   SectionID: [Params.SectionID],
  //   ProgramID: [Params.ProgramID]
  // }
  return QueryIf[config.Actions.executeDomainList](
    [
      "financial.orderItem.findDueDatesByItemsSummary",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findSectionsLite(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.section.findSectionsLite",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findProductBySeatGroupID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.product.findBySeatGroupID",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function findOptionalItemBySeatGroupID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeDomainList](
    [
      "jxntm.seatGroup.optionalItem.findBySeatGroupID",
      Params,
      Headers ? Headers.StartPosition : MIN_START_POSITION_SIZE,
      Headers ? Headers.PageSize : MAX_PAGE_SIZE
    ],
    Headers
  )
}

export function getPromotionalForSeatGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return QueryIf[config.Actions.executeRowMapNamedQuery](
    ["financial.discount.PromotionalForSeatGroup", Params, null],
    Headers
  ).then((x) => {
    if (x.success && Array.isArray(x.data)) {
      x.data = x.data.map((p) => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(p.DiscountServiceParams as string, "text/xml")
        p.DiscountServiceParams = xmlDoc.getElementsByTagName("value")[0].childNodes[0].nodeValue
        return p
      })
    }
    return x
  })
}
