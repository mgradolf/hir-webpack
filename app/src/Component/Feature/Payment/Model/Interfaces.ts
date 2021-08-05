export type TypePaymentTypeID = 13 | 11 | 4 | 1 | 0 | 7
export interface IPaymentTypes {
  AdjustFromCashAccount: TypePaymentTypeID
  Gift: TypePaymentTypeID
  Cash: TypePaymentTypeID
  Savings: TypePaymentTypeID
  Checks: TypePaymentTypeID
  ExternalPayment: TypePaymentTypeID
}

export type TypePaymentAmountType = "full_amount" | "partial_amount" | "custom_amount"
export interface IPaymentAmountType {
  full_amount: { label: string; value: TypePaymentAmountType }
  partial_amount: { label: string; value: TypePaymentAmountType }
  custom_amount: { label: string; value: TypePaymentAmountType }
}

export interface IPersonProfile {
  PersonID: number
  AccountID?: number
  PersonDescriptor: string
  Ethnicity: any
  FirstName: string
  LastName: string
  MaidenName: string
  OtherName: string
  MiddleName: string
  SortName: string
  GovID: any
  ERPID: string
  Address: string
  TelephoneNumber: string
  EmailAddress: string
  IsDeceased: boolean
  Birthday: string
  AddressLine1: string
  AddressLine2: string
  AddressLine3: string
  Locality: string
  PostalCode: string
  State: any
  Country: string
  AccountName: any
  RoleName: any
  GenderTypeName: string
  SourceID: number
}

export interface IPayer {
  PersonID?: number
  PersonProfile?: IPersonProfile
}

export interface IItemRequest {
  RequestID: number
  UnitPrice: number
  ItemQuantity: number
  ItemType: string
  NetPrice: number
  GrossPrice: number
  Discount: number
}

export interface IPayer_Func {
  assignPayer(Person?: IPersonProfile): void
}
