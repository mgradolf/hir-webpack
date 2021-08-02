import { ISeatGroup } from "~/Component/Feature/Order/Model/Interface/IFunc"

export interface IPersonProfile {
  AccountID?: number
  PersonID: number
  PersonDescriptor: string
  Ethnicity: any
  FirstName: string
  LastName: string
  MaidenName: string
  OtherName: string
  MiddleName: string
  SortName: string
  GovID: any
  ERPID: string
  Address: string
  TelephoneNumber: string
  EmailAddress: string
  IsDeceased: boolean
  Birthday: string
  AddressLine1: string
  AddressLine2: string
  AddressLine3: string
  Locality: string
  PostalCode: string
  State: any
  Country: string
  AccountName: any
  RoleName: any
  GenderTypeName: string
  SourceID: number
}

export interface IBuyer {
  PersonID?: number
  AccountID?: number
  PersonProfile?: IPersonProfile
}

export interface IValidationRegistration {
  check_sectionvalidity_issues: string[]
  RegistrationCheck_passed: boolean
  DuplicateRequestCheck_passed: boolean
  RegistrationQuestionCheck_passed: boolean
  StudentOnHoldCheck_passed: boolean
  SectionValidityCheck_passed: boolean
  PrerequisiteCheck_passed: boolean
  check_prerequisiteconflict_conflicts: any[]
  ScheduleConflict_passed: boolean
  check_scheduleconflict_conflicts: any[]
}

export interface IOverride {
  SectionPrerequisiteCheck: boolean
  StudentOnHoldCheckWithMessage: boolean
  StudentOnHoldCheck: boolean
  ScheduleConflictCheck: boolean
  AnswerQuestion: boolean
}

export interface IRegistrationRequest extends IItemRequest {
  ItemType: string
  RegistrationDate: string
  ItemRequestType: string
  PaymentAmount: number
  PaymentGatewayAccountID: number
  TranscriptCreditTypeID: number
  ItemTypeID: number
  RecipientPersonID: number
  UnitPrice: number
  StatusDate: string
  GradeScaleTypeID: number
  ItemQuantity: number
  ItemName: string
  AccessContext: any
  AnswerMap: { [key: string]: any }
  AttendanceExpected: any
  SectionID: number
  SeatGroupID: number
  OfferingID: number
  RecipientPersonName: any
  SeatGroups: ISeatGroup[]
  ItemList?: any[]
  issues?: IValidationRegistration
  OverrideData: IOverride
  varificationInProgress: boolean
}

export interface IOptionalItem {
  RequestID: number
  ItemType: string
  SectionFinancialID: number
  ItemRequestType: string
  PaymentAmount: number
  PaymentGatewayAccountID: number
  ItemTypeID: number
  UnitPrice: number
  ItemQuantity: number
  ItemName: string
  AccessContext: any
  AnswerMap: any
  SeatGroupID: number
}

export interface IRegistrationPromo {
  Description: string
  GLAccountID: number
  IsActive: boolean
  DiscountServiceParams: string
  Amount: number
  SectionFinancialID: number
  ShortName: string
  DiscocuntType: string
  AmountTypeID: number
  Name: string
  SectionDiscountID: number
  DiscountProgramID: number
  AmountType: string
  SectionID: number
  IsPromotedForMarketing: boolean
  IsSelected: boolean
}

export interface IProgramApplicaionIssues {
  program_validity_issues: any[]
  DuplicateRequestCheck_passed: boolean
  check_application_passed: boolean
  program_validity_passed: boolean
}

export interface IProgramApplicationRequest extends IItemRequest {
  ItemType: string
  ItemRequestType: string
  PaymentAmount: number
  PaymentGatewayAccountID: number
  TranscriptCreditTypeID: number
  ProgramID: number
  ItemTypeID: number
  RecipientPersonID: number
  UnitPrice: number
  StatusDate: string
  GradeScaleTypeID: number
  ItemQuantity: number
  ItemName: string
  AccessContext: any
  AnswerMap: any
  AttendanceExpected: any
  SectionID: number
  SeatGroupID: number
  OfferingID: number
  RecipientPersonName: any
  issues?: IProgramApplicaionIssues
  varificationInProgress?: boolean
}

export interface IProgramEnrollmentIssues {
  program_validity_passed: boolean
  check_enrollment_passed: boolean
  check_application_approval_passed: boolean
  DuplicateRequestCheck_passed: boolean
}

export interface IProgramEnrollmentRequest extends IItemRequest {
  ItemType: string
  ItemRequestType: string
  PaymentAmount: number
  PaymentGatewayAccountID: number
  TranscriptCreditTypeID: number
  ProgramID: number
  ItemTypeID: number
  RecipientPersonID: number
  UnitPrice: number
  StatusDate: string
  GradeScaleTypeID: number
  ItemQuantity: number
  ItemName: string
  AccessContext: any
  AnswerMap: any
  AttendanceExpected: any
  SectionID: number
  SeatGroupID: number
  OfferingID: number
  RecipientPersonName: string
  varificationInProgress?: boolean
  issues?: IProgramEnrollmentIssues
}

export interface IProductRequest extends IItemRequest {
  ItemType: string
  ItemRequestType: string
  ProductID: number
  PaymentAmount: number
  PaymentGatewayAccountID: number
  ItemTypeID: number
  RecipientPersonID: number
  UnitPrice: number
  ItemQuantity: number
  ItemName: string
  IsOptionalProduct: boolean
  AccessContext: any
  AnswerMap: any
  RecipientPersonName: any
  varificationInProgress?: boolean
}

export interface IPackageRequest extends IItemRequest {
  ItemType: string
  ItemRequestType: string
  ProductID: number
  PaymentAmount: number
  PaymentGatewayAccountID: number
  ItemTypeID: number
  RecipientPersonID: number
  UnitPrice: number
  ItemQuantity: number
  ItemName: string
  IsOptionalProduct: boolean
  AccessContext: any
  AnswerMap: any
  RecipientPersonName: any
  varificationInProgress?: boolean
}

export interface IMembershipIssues {
  FixedTermMembershipAlreadyBought_passed: boolean
  FixterTermMembershipExpired_passed: boolean
  DuplicateRequestCheck_passed: boolean
  MembershipCannotBeRenewed_passed: boolean
  MembershipAlreadyBoughtAndRenewed_passed: boolean
}

export interface IMembershipRequest extends IItemRequest {
  MembershipProgramName: string
  ItemType: string
  ItemRequestType: string
  ProductID: number
  PaymentAmount: number
  PaymentGatewayAccountID: number
  ItemTypeID: number
  RecipientPersonID: number
  UnitPrice: number
  MembershipDefinitionID: number
  ItemQuantity: number
  MembershipDefinitionName: string
  MktExpirationDate: any
  ItemName: string
  IsOptionalProduct: boolean
  MemberSince: any
  AccessContext: any
  AnswerMap: any
  RecipientPersonName: any
  issues?: IMembershipIssues
  varificationInProgress?: boolean
}

export interface IItemRequest {
  RequestID: number
  UnitPrice: number
  ItemQuantity: number
  ItemType: string

  NetPrice: number
  GrossPrice: number
  Discount: number
}

export interface IAllocationItem {
  FinancialID: number
  ItemCode: string
  Description: string
  RequestID: number
  Amount: number
  DueAmount: number
  ItemName: string
  Quantity: number
  DueNow: number
  PaymentGatewayAccountID: number
  Balance: number
}

export interface IAllocation {
  TotalQuantity: number
  Allocation: IAllocationItem[]
  SourceID: number
  TotalPrice: number
  NetTotalPrice: number
  ShowRenewLink: boolean
  TotalDueAmount: number
  ShowMembershipLink: boolean
  TotalDiscount: number
  TotalPaymentAmount: number
}
