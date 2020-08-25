export interface IOfferingFieldNames {
  OfferingID: string
  OfferingTypeID: string
  OfferingCode: string
  Name: string
  Description: string
  URL: string

  CreationDate: string
  StartTermID: string

  TerminationDate: string
  RecurrenceRule: string
  EndTermID: string

  OfferingStatusCodeID: string
  OrganizationID: string
  IsQuickAdmit: string

  HasApprovalProcess: string

  SubmitInquiryToUserID: string
  PaymentGatewayAccountID: string

  DefaultSectionTypeID: string

  OfferingStatusReleaseID: string
  CourseID: string
  EffectiveCreationDate: string
  EffectiveTerminationDate: string
  OfferingUsageType: string
}

export interface IOfferingFinancialFieldNames {
  IsCharge: string
  FinancialBasisTypeID: string
  Description: string
  ItemUnitAmount: string
  GLAccountID: string
  IsActive: string
  FinancialTypeID: string
  oca: string
  Weight: string
  FinancialID: string
  IsOptional: string
  FinancialCategoryTypeID: string
  ApplyToID: string
  IsTaxable: string
}

export interface IOfferingApprovalFieldNames {
  OfferingID: string
  StatusID: string
  UserLogin: string
  Remarks: string
  IsNotifyByEmail: string
}
