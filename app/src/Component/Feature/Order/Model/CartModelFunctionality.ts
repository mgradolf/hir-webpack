import {
  IBuyer_Func,
  IProgramApplicationRequest_Func,
  IRegistrationRequest_Func,
  ISeatGroup
} from "~/Component/Feature/Order/Model/Interface/IFunc"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import {
  createOptionalItemRequest,
  createProgramApplicationRequest,
  createRegistrationRequest,
  launchRegistrationRequest,
  validateProgramRequest,
  validateRegistrationRequest
} from "~/ApiServices/Service/CartService"
import {
  IBuyer,
  IItemRequest,
  IProgramApplicationRequest,
  IRegistrationRequest
} from "~/Component/Feature/Order/Model/Interface/IModel"
import { eventBus } from "~/utils/EventBus"
import { UPDATE_BUYER, UPDATE_CART } from "~/Pages/Manage/Financials/CreateOrderPage"

export class CartModelFunctionality implements IBuyer_Func, IRegistrationRequest_Func, IProgramApplicationRequest_Func {
  buyer: IBuyer = {}
  itemList: IItemRequest[] = [
    {
      RequestID: 606483311526822030,
      ItemType: "RegistrationRequest",
      ItemRequestType: "RegistrationRequest",
      PaymentAmount: 1000.0,
      PaymentGatewayAccountID: 9,
      TranscriptCreditTypeID: 2002,
      ItemTypeID: 1,
      RecipientPersonID: 14889,
      UnitPrice: 1000.0,
      StatusDate: "2021-06-09T12:02:54+06:00",
      GradeScaleTypeID: 2044,
      ItemQuantity: 1,
      ItemName: "SMT.(3) SMT Offering",
      AccessContext: null,
      AnswerMap: null,
      AttendanceExpected: null,
      SectionID: 10852,
      SeatGroupID: 11562,
      OfferingID: 6824,
      RecipientPersonName: "0507, nargis",
      SeatGroups: [
        {
          IsDefault: false,
          AccountID: 4813,
          ReservedSeats: 0,
          TotalSeats: 10,
          SectionID: 8885,
          SeatGroupID: 11933,
          SeatGroupName: "aarosh",
          AvailableSeats: 10
        },
        {
          IsDefault: true,
          AccountID: null,
          ReservedSeats: 122,
          TotalSeats: 123,
          SectionID: 8885,
          SeatGroupID: 9178,
          SeatGroupName: "Default seat group",
          AvailableSeats: 1
        },
        {
          IsDefault: false,
          AccountID: null,
          ReservedSeats: 2,
          TotalSeats: 500,
          SectionID: 8885,
          SeatGroupID: 9638,
          SeatGroupName: "j2ee",
          AvailableSeats: 498
        }
      ],
      issues: {
        RegistrationCheck_passed: false,
        DuplicateRequestCheck_passed: false,
        SectionValidityCheck_passed: false,

        // RegistrationCheck_passed: true,
        // DuplicateRequestCheck_passed: true,
        // SectionValidityCheck_passed: true,
        check_sectionvalidity_issues: [],
        check_prerequisiteconflict_conflicts: [
          {
            Status: "NOT-TAKEN",
            SectionNumber: null,
            CreditHours: null,
            StatusID: null,
            OfferingCode: "COMP-101",
            Grade: null,
            OfferingName: "Java Programming I",
            SectionID: null,
            OfferingID: 5576
          }
        ],
        RegistrationQuestionCheck_passed: false,
        ScheduleConflict_passed: false,
        StudentOnHoldCheck_passed: false,
        PrerequisiteCheck_passed: false,
        check_scheduleconflict_conflicts: [
          { SectionNumber: "COMP-201.(1)" },
          { SectionNumber: "SMT1" },
          { SectionNumber: "SMT1" },
          { SectionNumber: "SMT1" },
          { SectionNumber: "SMT1" },
          { SectionNumber: "SMT1" },
          { SectionNumber: "SMT1" }
        ]
      },
      OverrideData: {
        SectionPrerequisiteCheck: false,
        StudentOnHoldCheckWithMessage: false,
        StudentOnHoldCheck: false,
        ScheduleConflictCheck: false,
        AnswerQuestion: false
      }
    } as IItemRequest
  ]

  assignPerson(Person?: { [key: string]: any }): void {
    this.buyer.PersonID = Person ? Person.PersonID : undefined
    this.buyer.AccountID = Person ? Person.AccountID : undefined
    this.buyer.PersonProfile = Person ? Person : undefined

    eventBus.publish(UPDATE_BUYER, this.buyer)
  }
  launchRegistrationRequest(): Promise<IApiResponse> {
    if (this.itemList.length) return launchRegistrationRequest({ ItemList: this.itemList })
    else return Promise.resolve({ code: 200, success: false, data: "", error: "" })
  }
  addRegistrationRequest(
    SeatGroups: ISeatGroup[],
    SeatGroupID: number,
    RecipientPersonID?: number,
    StatusDate?: string
  ): Promise<IApiResponse> {
    let tempRegistrationRequest: IRegistrationRequest
    return createRegistrationRequest({
      SeatGroupID,
      RecipientPersonID,
      AccountID: this.buyer.AccountID,
      StatusDate
    }).then((x) => {
      if (x.success) {
        tempRegistrationRequest = x.data
        console.log(tempRegistrationRequest)
        tempRegistrationRequest.varificationInProgress = true
        tempRegistrationRequest.OverrideData = {
          SectionPrerequisiteCheck: false,
          StudentOnHoldCheckWithMessage: false,
          StudentOnHoldCheck: false,
          ScheduleConflictCheck: false,
          AnswerQuestion: false
        }
        this.itemList = [...this.itemList, tempRegistrationRequest]
        eventBus.publish(UPDATE_CART, this.itemList)
        validateRegistrationRequest({
          SeatGroupID: tempRegistrationRequest.SeatGroupID,
          RecipientPersonID: tempRegistrationRequest.RecipientPersonID,
          StatusDate: tempRegistrationRequest.StatusDate,
          AnswerMap: tempRegistrationRequest.AnswerMap
        }).then((response) => {
          tempRegistrationRequest.varificationInProgress = true
          if (response.success) {
            tempRegistrationRequest.issues = {
              RegistrationCheck_passed: !!response.data.RegistrationCheck_passed,
              DuplicateRequestCheck_passed: !!response.data["Request.DuplicateRequestCheck_passed"],
              PrerequisiteCheck_passed: !!response.data["Request.PrerequisiteCheck_passed"],
              RegistrationQuestionCheck_passed: !!response.data["Request.RegistrationQuestionCheck_passed"],
              ScheduleConflict_passed: !!response.data["Request.ScheduleConflict_passed"],
              StudentOnHoldCheck_passed: !!response.data["Request.StudentOnHoldCheck_passed"],
              SectionValidityCheck_passed: !!response.data.SectionValidityCheck_passed,
              check_sectionvalidity_issues: response.data.check_sectionvalidity_issues,
              check_prerequisiteconflict_conflicts: response.data.check_prerequisiteconflict_conflicts || [],
              check_scheduleconflict_conflicts: response.data.check_scheduleconflict_conflicts || []
            }
          }
          tempRegistrationRequest.varificationInProgress = false
          tempRegistrationRequest.SeatGroups = SeatGroups
          const __itemList = this.itemList.map((x) => {
            if (x.RequestID === tempRegistrationRequest.RequestID) x = tempRegistrationRequest
            return x
          })
          eventBus.publish(UPDATE_CART, __itemList)
        })
      }
      return x
    })
  }

  removeRegistrationRequest(RequestID: number): void {
    this.itemList = this.itemList.filter((x) => x.RequestID !== RequestID)
    eventBus.publish(UPDATE_CART, this.itemList)
  }

  addOptionalItem(RequestID: number, SeatGroupID: number, SectionFinancialIDs: number[], ProductIDs: number[]) {
    if (RequestID && SeatGroupID) {
      return createOptionalItemRequest({
        SeatGroupID: SeatGroupID,
        ...(SectionFinancialIDs.length && { SectionFinancialIDs: SectionFinancialIDs }),
        ...(ProductIDs.length && { ProductIDs: ProductIDs })
      }).then((response) => {
        if (response.success && Array.isArray(response.data)) {
          this.itemList = (this.itemList as IRegistrationRequest[]).map((x) => {
            if (x.RequestID === RequestID && Array.isArray(response.data)) {
              x.ItemList = [...response.data]
            }
            return x
          })
          eventBus.publish(UPDATE_CART, this.itemList)
        }
        return response
      })
    }
    return Promise.resolve({ code: 200, success: false, data: [], error: true })
  }

  addAnswerMap(RequestID: number, answerMap: { [key: string]: any }) {
    this.itemList = (this.itemList as IRegistrationRequest[]).map((x) => {
      if (x.RequestID === RequestID) x.AnswerMap = answerMap
      return x
    })
    eventBus.publish(UPDATE_CART, this.itemList)
  }

  createProgramApplicationRequest(ProgramID: number, RecipientPersonID?: number) {
    return createProgramApplicationRequest({ ProgramID, RecipientPersonID }).then((response) => {
      if (response.success) {
        const tempRegistrationRequest: IProgramApplicationRequest = response.data
        tempRegistrationRequest.varificationInProgress = false
        validateProgramRequest({
          ProgramID,
          RecipientPersonID,
          ProgramRequestType: "ProgramApplicationRequest"
        }).then((validationResponse) => {
          tempRegistrationRequest.varificationInProgress = false
        })
        this.itemList = [...this.itemList, response.data]
        eventBus.publish(UPDATE_CART, this.itemList)
      }
      return response
    })
  }
}