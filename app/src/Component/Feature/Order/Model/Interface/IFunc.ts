import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IItemRequest, IPersonProfile, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export interface IBuyer_Func {
  assignPerson: (Person: IPersonProfile) => void
  findIssue?: (item: IItemRequest) => boolean
}

export interface ISeatGroup {
  AccountID: any
  AvailableSeats: 0
  IsDefault: boolean
  ReservedSeats: number
  SeatGroupID: number
  SeatGroupName: string
  SectionID: number
  TotalSeats: number
}

export interface IRequest_Func {
  removeCartItemRequest: (RequestID?: number) => Promise<IApiResponse>
  launchRequest: () => Promise<IApiResponse>
  getAllocations: () => Promise<IApiResponse>
  updateCartByEvent: () => void
  setPaymentDueDate: (dateString: string) => void
}

export interface IRegistrationRequest_Func {
  addRegistrationRequest: (
    SeatGroups: ISeatGroup[],
    SeatGroupID: number,
    RecipientPersonID?: number,
    StatusDate?: string
  ) => Promise<IApiResponse>

  getPromotionalForSeatGroups: () => void
  addOptionalItem: (
    RequestID: number,
    SeatGroupID: number,
    SectionFinancialIDs: number[],
    ProductIDs: number[]
  ) => Promise<IApiResponse>

  addAnswerMap: (RequestID: number, answerMap: { [key: string]: any }) => void
  applyPromoCodes: (ItemList: IRegistrationRequest[], PromotionalCodes: string[]) => Promise<IApiResponse>
  addPromo: (SectionDiscountIDsToBeAdded: number[]) => Promise<IApiResponse>
  getOverrides: () => { [key: string]: any }
}

export interface IProgramApplicationRequest_Func {
  createProgramApplicationRequest: (ProgramID: number, RecipientPersonID?: number) => Promise<IApiResponse>
}

export interface IProgramEnrollmentRequest_Func {
  createProgramEnrollmentRequest: (ProgramID: number, RecipientPersonID?: number) => Promise<IApiResponse>
}

export interface IIProductRequest_Func {
  createProductRequest: (ProductID: number, RecipientPersonID: number, Quantity: number) => Promise<IApiResponse>
}
export interface IPackageRequest_Func {
  createPackageRequest: (
    ProductID: number,
    PackageID: number,
    RecipientPersonID: number,
    Quantity: number
  ) => Promise<IApiResponse>
}

export interface IMembershipRequest_Func {
  createMembershipRequest: (MembershipDefinitionID: number, RecipientPersonID: number) => Promise<IApiResponse>
}
