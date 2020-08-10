export interface IOffering {
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

export interface IOfferingFinancial {
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
