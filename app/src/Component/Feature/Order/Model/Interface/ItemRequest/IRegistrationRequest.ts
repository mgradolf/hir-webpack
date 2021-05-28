import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ICartModel_ItemList, IItemRequest } from ".."

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

export interface IRegistrationRequest_Func extends ICartModel_ItemList {
  addRegistrationRequest: (SectionID: number, RecipientPersonID?: number, StatusDate?: string) => Promise<IApiResponse>

  // updateRegistrationRequest: (RequestID: number, Params: any) => Promise<IApiResponse>
  removeRegistrationRequest: (RequestID: number) => void
}
