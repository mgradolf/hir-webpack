export interface IAccountFieldNames {
  AccountID: any
  AccountTypeID: any
  Name: any
  PrimaryAccountAffiliationID: any
  PaymentTerm: any
  AllowToPayLater: any
  IsPublic: any
  IsApprovalRequired: any
  DefaultWaitlistPriority: any
  FEID: any
}

export interface IAccountContactFieldNames {
  AccountAffiliationID: any
  AccountID: any
  PersonID: any
  StatusID: any
  FirstName: any
  LastName: any
  Birthday: any
  EmailAddress: any
  AffiliationRoleTypeID: any
  IsContactShared: any
  IsPrimaryAccountAffiliation: any
  ERPID: any
  AsnwerList: any
}

export interface IBulkOrderFieldNames {
  AccountID: any
  Name: any
  SectionID: any
  IsDefaultAllocation: any
  NumberOfSeats: any
  InvitationCode: any
  AffiliateFinancials: any
  StudentFinancials: any
  IsGenerateOrder: any
  PurchaserID: any
  PONumber: any
  POAmount: any
  POName: any
  PaymentDueDate: any
}
