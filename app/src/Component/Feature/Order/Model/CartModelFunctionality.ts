import { IBuyer_Func, IRegistrationRequest_Func } from "~/Component/Feature/Order/Model/Interface/IFunc"
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
  addRegistrationRequest(SectionID: number, RecipientPersonID?: number, StatusDate?: string): Promise<IApiResponse> {
    let tempRegistrationRequest: IRegistrationRequest
    console.log("this.model ", this.itemList)
    return createRegistrationRequest({
      SectionID,
      RecipientPersonID,
      AccountID: this.buyer.AccountID,
      StatusDate
    })
      .then((response) => {
        if (response.success) {
          tempRegistrationRequest = response.data
          console.log(tempRegistrationRequest)

          return validateRegistrationRequest({
            SeatGroupID: tempRegistrationRequest.SeatGroupID,
            RecipientPersonID: tempRegistrationRequest.RecipientPersonID,
            StatusDate: tempRegistrationRequest.StatusDate,
            AnswerMap: tempRegistrationRequest.AnswerMap
          })
        } else {
          return Promise.resolve({ code: 200, success: false, data: [], error: false })
        }
      })
      .then((response) => {
        if (response.success) {
          tempRegistrationRequest.issues = response.data
          this.itemList.push(tempRegistrationRequest)
          eventBus.publish(UPDATE_CART, this.itemList)
        }
        return response
      })
  }

  removeRegistrationRequest(RequestID: number): void {
    this.itemList = this.itemList.filter((x) => x.RequestID !== RequestID)
    eventBus.publish(UPDATE_CART, this.itemList)
  }
}
