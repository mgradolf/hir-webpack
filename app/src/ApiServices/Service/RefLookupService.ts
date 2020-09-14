import RefLookupService, { config } from "@packages/api/lib/proxy/Service/RefLookupService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getOfferingTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingType"
  })
}

export function getTerms(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Term"
  })
}

export function getOfferingStatusTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingStatusCode"
  })
}

export function getOrganizations(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Organization"
  })
}

export function getPaymentGatewayAccounts(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "PaymentGatewayAccount"
  })
}

export function getSectionTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SectionType"
  })
}

export function getGLAccountTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "GLAccount"
  })
}

export function getFinancialCategoryType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "FinancialCategoryType"
  })
}

export function getFinancialBasisType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "FinancialBasisType"
  })
}

export function getFinancialType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "FinancialType"
  })
}

export function getTagTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "TagType"
  })
}

export function getPolicyTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingGroupPolicyType"
  })
}

export function getInstructorTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "InstructorType"
  })
}

export function getCountries(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "CountryCode"
  })
}

export function getGenderTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "GenderType"
  })
}

export function getRegionCodes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "RegionCode"
  })
}

export function getEthnicityTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "EthnicityType"
  })
}

export function getInstitutionStatusTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "InstitutionStatusCode"
  })
}
