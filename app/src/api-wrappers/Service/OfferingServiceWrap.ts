import {
  addOrRemoveOfferingToCatalog,
  createOffering,
  updateOffering,
  searchOffering,
  createOfferingFinancial,
  updateOfferingFinancial,
  searchOfferingFinancial
} from '@packages/api/lib/proxy/Service/OfferingService'
import callApi from '~/api-wrappers/call_api'
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */

interface IOffering {
  OfferingCode: null | string
  Name: null | string
  Description: null | string
  OrganizationID: null | number
  IsQuickAdmit: boolean
  OfferingStatusCodeID: null | number
  OfferingStatusReleaseID: null | number
  OfferingTypeID: number
  DefaultSectionTypeID: null | number
  RecurrenceRule: null | number
  StartTermID: null | number
  EndTermID: null | number
  CreationDate: null | string
  TerminationDate: null | string
  URL: null | string
  HasApprovalProcess: boolean
  CourseID: null | number
  EffectiveCreationDate: null | string
  EffectiveTerminationDate: null | string
  SubmitInquiryToUserID: null | number
  OfferingUsageType: null | number
  PaymentGatewayAccountID: null | number
}

export function createOfferingWrap(Params: IOffering): Promise<[any, any]> {
  return callApi(createOffering, Params)
}

export function updateOfferingWrap(Params: IOffering): Promise<[any, any]> {
  return callApi(updateOffering, Params)
}

export function searchOfferingWrap(OfferingCode: string): Promise<[any, any]> {
  const Params: any = { OfferingCode }
  return callApi(searchOffering, Params)
}

export function addOrRemoveOfferingToCatalogWrap(
  OfferingID: number,
  CatalogIDs: Array<number>
): Promise<[any, any]> {
  const Params: any = { OfferingID, CatalogIDs }
  return callApi(addOrRemoveOfferingToCatalog, Params)
}

/* -------------------------------------------------------------------------- */
/*                         offering financial section                         */
/* -------------------------------------------------------------------------- */

interface IOfferingFinancial {
  FinancialTypeID: null | number
  ApplyToID: null | number
  FinancialBasisTypeID: null | number
  FinancialCategoryTypeID: null | number
  Description: null | string
  ItemUnitAmount: null | number
  IsCharge: boolean
  IsOptional: boolean
  IsActive: boolean
  Weight: null | number
  IsTaxable: boolean
  GLAccountID: null | number
}

export function createOfferingFinancialWrap(
  Params: IOfferingFinancial
): Promise<[any, any]> {
  return callApi(createOfferingFinancial, Params)
}

export function updateOfferingFinancialWrap(
  Params: IOfferingFinancial
): Promise<[any, any]> {
  return callApi(updateOfferingFinancial, Params)
}

export function searchOfferingFinancialWrap(
  OfferingID: number
): Promise<[any, any]> {
  const Params: any = { OfferingID }
  return callApi(searchOfferingFinancial, Params)
}
