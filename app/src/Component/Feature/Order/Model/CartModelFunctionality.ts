import { IBuyer_Func, IRegistrationRequest_Func, ISeatGroup } from "~/Component/Feature/Order/Model/Interface/IFunc"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import {
  createRegistrationRequest,
  launchRegistrationRequest,
  validateRegistrationRequest
} from "~/ApiServices/Service/CartService"
import { IBuyer, IItemRequest, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { eventBus } from "~/utils/EventBus"
import { UPDATE_BUYER, UPDATE_CART } from "~/Pages/Manage/Financials/CreateOrderPage"

export class CartModelFunctionality implements IBuyer_Func, IRegistrationRequest_Func {
  buyer: IBuyer = {}
  itemList: IItemRequest[] = []

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
              check_prerequisiteconflict_conflicts: response.data.check_prerequisiteconflict_conflicts,
              check_scheduleconflict_conflicts: response.data.check_prerequisiteconflict_conflicts
            }

            tempRegistrationRequest.OverrideData = {
              SectionPrerequisiteCheck: false,
              StudentOnHoldCheckWithMessage: false,
              StudentOnHoldCheck: false,
              ScheduleConflictCheck: false,
              AnswerQuestion: false
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
}
