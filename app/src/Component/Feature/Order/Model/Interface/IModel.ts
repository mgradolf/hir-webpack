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
  ScheduleConflict_passed: boolean
  StudentOnHoldCheck_passed: boolean
  PrerequisiteCheck_passed: boolean
  SectionValidityCheck_passed: boolean
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
  AnswerMap: any
  AttendanceExpected: any
  SectionID: number
  SeatGroupID: number
  OfferingID: number
  RecipientPersonName: any
  issues?: IValidationRegistration
}

export interface IItemRequest {
  RequestID: number
}
