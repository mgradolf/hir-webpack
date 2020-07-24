import { config } from '../../utils/api_config_model'
import { getToken } from '../../utils/token_manage'
import callApi from '../../utils/call_api'

const commonConfigs: config = {
  url: 'api/hirServlet',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    Service: 'OfferingService'
  }
}

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

export function createOffering(Params: IOffering): Promise<[any, any]> {
  const requestConfig: config = commonConfigs
  requestConfig.data = {
    ...requestConfig.data,
    Action: createOffering.name,
    Params
  }
  return callApi(requestConfig)
}

export function updateOffering(Params: IOffering): Promise<[any, any]> {
  const requestConfig: config = commonConfigs
  requestConfig.data = {
    ...requestConfig.data,
    Action: updateOffering.name,
    Params
  }
  return callApi(requestConfig)
}

export function searchOffering(OfferingCode: string): Promise<[any, any]> {
  const requestConfig: config = commonConfigs
  requestConfig.data = {
    ...requestConfig.data,
    Action: searchOffering.name,
    Params: {
      OfferingCode
    }
  }
  return callApi(requestConfig)
}

export function addOrRemoveOfferingToCatalog(
  OfferingID: number,
  CatalogIDs: Array<number>
): Promise<[any, any]> {
  const requestConfig: config = commonConfigs
  requestConfig.data = {
    ...requestConfig.data,
    Action: addOrRemoveOfferingToCatalog.name,
    Params: { OfferingID, CatalogIDs }
  }
  return callApi(requestConfig)
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

export function createOfferingFinancial(
  Params: IOfferingFinancial
): Promise<[any, any]> {
  const requestConfig: config = commonConfigs
  requestConfig.data = {
    ...requestConfig.data,
    Action: createOfferingFinancial.name,
    Params
  }
  return callApi(requestConfig)
}

export function updateOfferingFinancial(
  Params: IOfferingFinancial
): Promise<[any, any]> {
  const requestConfig: config = commonConfigs
  requestConfig.data = {
    ...requestConfig.data,
    Action: updateOfferingFinancial.name,
    Params
  }
  return callApi(requestConfig)
}

export function searchOfferingFinancial(
  OfferingID: number
): Promise<[any, any]> {
  const requestConfig: config = commonConfigs
  requestConfig.data = {
    ...requestConfig.data,
    Action: searchOfferingFinancial.name,
    Params: {
      OfferingID
    }
  }
  return callApi(requestConfig)
}
