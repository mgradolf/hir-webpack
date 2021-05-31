import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export interface IBuyer_Func {
  assignPerson: (PersonID: { [key: string]: any }) => void
}

export interface IRegistrationRequest_Func {
  addRegistrationRequest: (SectionID: number, RecipientPersonID?: number, StatusDate?: string) => Promise<IApiResponse>

  // updateRegistrationRequest: (RequestID: number, Params: any) => Promise<IApiResponse>
  removeRegistrationRequest: (RequestID: number) => void
}

export interface ICartModel_ItemList_Func {
  launchRegistrationRequest: (ItemList: IItemRequest[]) => Promise<IApiResponse>
}
