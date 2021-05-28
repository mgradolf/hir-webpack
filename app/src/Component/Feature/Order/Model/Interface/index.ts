import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IBuyer } from "./IBuyer"
import { IRegistrationRequest_Func } from "./ItemRequest/IRegistrationRequest"

export interface ICartModel_ItemList {
  ItemList: IItemRequest[]
  launchRegistrationRequest: (ItemList: IItemRequest[]) => Promise<IApiResponse>
}

export interface IItemRequest {
  RequestID: number
}

export interface ICartModel extends IRegistrationRequest_Func, IBuyer {}
