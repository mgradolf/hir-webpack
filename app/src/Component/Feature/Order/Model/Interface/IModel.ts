import { ISeatGroup } from "~/Component/Feature/Order/Model/Interface/IFunc"

export interface IBuyer {
  PersonID?: number
  AccountID?: number
  PersonProfile?: { [key: string]: any }
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
  issues?: IValidationRegistration
  OverrideData: IOverride
  varificationInProgress: boolean
  SeatGroups: ISeatGroup[]
  ItemList?: any[]
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

export interface IProgramApplicaionIssues {
  program_validity_issues: any[]
  DuplicateRequestCheck_passed: boolean
  check_application_passed: boolean
  program_validity_passed: boolean
}

export interface IProgramApplicationRequest {
  RequestID: number
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
export interface IItemRequest {
  RequestID: number
}
