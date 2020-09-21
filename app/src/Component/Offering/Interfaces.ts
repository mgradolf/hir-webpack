export interface IOfferingFieldNames {
  OfferingID: any
  OfferingTypeID: any
  OfferingCode: any
  Name: any
  Description: any
  URL: any

  CreationDate: any
  StartTermID: any

  TerminationDate: any
  EndTermID: any

  RecurrenceRule: any

  OfferingStatusCodeID: any
  OrganizationID: any
  IsQuickAdmit: any

  HasApprovalProcess: any

  SubmitInquiryToUserID: any
  PaymentGatewayAccountID: any

  DefaultSectionTypeID: any

  OfferingStatusReleaseID: any
  CourseID: any
  EffectiveCreationDate: any
  EffectiveTerminationDate: any
  OfferingUsageType: any
}

export interface IOfferingFinancialFieldNames {
  IsCharge: any
  FinancialBasisTypeID: any
  Description: any
  ItemUnitAmount: any
  GLAccountID: any
  IsActive: any
  FinancialTypeID: any
  oca: any
  Weight: any
  FinancialID: any
  IsOptional: any
  FinancialCategoryTypeID: any
  ApplyToID: any
  IsTaxable: any
}

export interface IOfferingApprovalFieldNames {
  OfferingID: any
  StatusID: any
  UserLogin: any
  Remarks: any
  IsNotifyByEmail: any
}

export interface IOfferingRequisiteGroupFieldNames {
  OfferingID: string
  PolicyTypeID: string
  PolicyValue: string
  Name: string
  IsInformational: string
  CatalogNarrative: string
  RequisiteOfferingGroupID: string
}

export interface ISectionSeatGroupFieldNames {
  Name: any
  NumberOfSeats: any
  EstimatedEnrollment: any
  DueDatePolicyID: any
  WaitListEnabled: any
  SeatGroupID: any
  SectionID: any
}
