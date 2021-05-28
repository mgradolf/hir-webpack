import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import {
  createRegistrationRequest,
  launchRegistrationRequest,
  validateRegistrationRequest
} from "~/ApiServices/Service/CartService"
import { ICartModel, IItemRequest } from "./Interface"
import { IRegistrationRequest } from "./Interface/ItemRequest/IRegistrationRequest"

export class CartModel implements ICartModel {
  PersonID?: number
  AccountID?: number
  PersonProfile?: { [key: string]: any }
  AccountAffiliation?: any[]
  ItemList: IItemRequest[] = []

  assignPerson(Person?: { [key: string]: any }): void {
    this.PersonID = Person ? Person.PersonID : undefined
    this.AccountID = Person ? Person.AccountID : undefined
    this.PersonProfile = Person ? Person : undefined
  }
  launchRegistrationRequest(): Promise<IApiResponse> {
    if (this.ItemList.length) return launchRegistrationRequest({ ItemList: this.ItemList })
    else return Promise.resolve({ code: 200, success: false, data: "", error: "" })
  }
  addRegistrationRequest(SectionID: number, RecipientPersonID?: number, StatusDate?: string): Promise<IApiResponse> {
    let tempRegistrationRequest: IRegistrationRequest
    return createRegistrationRequest({ SectionID, RecipientPersonID, AccountID: this.AccountID, StatusDate })
      .then((response) => {
        if (response.success) {
          tempRegistrationRequest = response.data
        }
        return validateRegistrationRequest({
          SeatGroupID: tempRegistrationRequest.SeatGroupID,
          RecipientPersonID: tempRegistrationRequest.RecipientPersonID,
          StatusDate: tempRegistrationRequest.StatusDate,
          AnswerMap: tempRegistrationRequest.AnswerMap
        })
      })
      .then((response) => {
        if (response.success) {
          tempRegistrationRequest.issues = response.data
        }
        this.ItemList.push(tempRegistrationRequest)
        return response
      })
  }

  removeRegistrationRequest(RequestID: number): void {
    this.ItemList = this.ItemList.filter((x) => x.RequestID !== RequestID)
  }
}
