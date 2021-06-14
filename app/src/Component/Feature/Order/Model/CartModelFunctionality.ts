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
import { fakeCartData } from "~/Component/Feature/Order/Model/fakeCartData"

export class CartModelFunctionality implements IBuyer_Func, IRegistrationRequest_Func, IProgramApplicationRequest_Func {
  buyer: IBuyer = {}
  itemList: IItemRequest[] = fakeCartData

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
        tempRegistrationRequest.varificationInProgress = true
        this.itemList = [...this.itemList, tempRegistrationRequest]
        eventBus.publish(UPDATE_CART, this.itemList)
        validateProgramRequest({
          ProgramID,
          RecipientPersonID,
          ProgramRequestType: "ProgramApplicationRequest"
        }).then((validationResponse) => {
          tempRegistrationRequest.varificationInProgress = false
          if (validationResponse.success)
            tempRegistrationRequest.issues = {
              program_validity_issues: validationResponse.data.program_validity_issues || [],
              DuplicateRequestCheck_passed: !!validationResponse.data["Request.DuplicateRequestCheck_passed"],
              check_application_passed: !!validationResponse.data.check_application_passed,
              program_validity_passed: !!validationResponse.data.program_validity_passed
            }
          this.itemList = this.itemList.map((x) => {
            if (x.RequestID === tempRegistrationRequest.RequestID) {
              x = tempRegistrationRequest
            }
            return x
          })
          eventBus.publish(UPDATE_CART, this.itemList)
        })
      }
      return response
    })
  }
}
