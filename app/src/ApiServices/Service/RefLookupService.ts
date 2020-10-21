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

export function getSectionStatusCode(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SectionStatusCode"
  })
}

export function getGLAccountTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "GLAccount"
  })
}
export function getAccountTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "AccountType"
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

export function getFiscalPeriodCodes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "FiscalPeriodCode"
  })
}

export function getDueDatePolicy(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "DueDatePolicy"
  })
}

export function getGradeScaleType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "GradeScaleType"
  })
}

export function getCreditType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "CreditType"
  })
}

export function getAttendanceUnit(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "AttendanceUnit"
  })
}

export function getRefundPolicyType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "RefundPolicyType"
  })
}

export function getMeetingTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "MeetingType"
  })
}

export function getSites(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Site"
  })
}

export function getProgramStatusCodes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ProgramStatusCode"
  })
}

export function getSectionNotices(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SectionNoticeType"
  })
}

export function getDiscountAmountTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "DiscountAmountType"
  })
}

export function getQuestionEvents(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "QuestionEvent"
  })
}

export function getQuestionGroup(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "QuestionGroup"
  })
}

export function getRoomTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "RoomUseType"
  })
}

export function getPreferenceValueType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "PreferenceValueType"
  })
}

export function getOPCStatusCode(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OPCStatusCode"
  })
}

export function getRequestType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "RequestType"
  })
}

export function getSourceModule(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SourceModule"
  })
}

export function getSectionRosterStatusCode(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SectionRosterStatusCode"
  })
}

export function getProductCategoryTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ProductCategory"
  })
}

export function getTranscriptTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "TranscriptType"
  })
}
