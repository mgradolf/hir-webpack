import { IAllocationItem } from "~/Component/Feature/Order/Model/Interface/IModel"

interface IRequestContext {
  SourceID: any
  RequesterStaffUserName: string
}

interface IRequestData {
  PersonID: any
  PersonDescriptor: any
  Ethnicity: any
  FirstName: any
  LastName: any
  MaidenName: any
  OtherName: any
  MiddleName: any
  SortName: any
  GovID: any
  ERPID: any
  Address: any
  TelephoneNumber: any
  EmailAddress: any
  IsDeceased: any
  Birthday: any
  AddressLine1: any
  AddressLine2: any
  AddressLine3: any
  Locality: any
  PostalCode: any
  State: any
  Country: any
  AccountName: any
  RoleName: any
  GenderTypeName: any
  Allocation: IAllocationItem[]
  ItemList?: any[]
}
interface IExternalPayment extends IRequestData {
  SuccessPath: any
  FailurePath: any
  PurchaseOrderAmount: any
  TotalPaymentAmount: any
  PaymentTypeID: any
  PaymentNotes: any
  PaymentTypeName: any
  PaymentType: any
  SourceID: any
  EmailReceipt: any
}

interface IAdjustFromCashAccount extends IRequestData {
  PurchaseOrderAmount: any
  TotalPaymentAmount: any
  PaymentTypeID: any
  PaymentNotes: any
  Description: any
  Amount: any
  DepositID: any
  TransactionNO: any
  DepositIDList: Array<{ DepositID: number }>
  ReferenceNo: any
  TransactionID: any
  TransactionDate: any
  RemainingAmount: any
  PaymentTypeName: any
  PaymentType: any
  SourceID: any
  EmailReceipt: any
}

interface ICash extends IRequestData {
  PurchaseOrderAmount?: any
  TotalPaymentAmount?: any
  PaymentTypeID?: any
  PaymentNotes?: any
  TransactionNumber?: any
  PaymentTypeName?: any
  PaymentType?: any
  SourceID?: any
  EmailReceipt?: any
  PurchaserPersonID?: any
}

interface ISaving extends IRequestData {
  PurchaseOrderAmount: any
  TotalPaymentAmount: any
  PaymentTypeID: any
  BankName: any
  PaymentNotes: any
  BankAccountName: any
  BankRoutingNumber: any
  CheckNumber: any
  BankAccountNumber: any
  PaymentTypeName: any
  PaymentType: any
  SourceID: any
  EmailReceipt: any
}

interface IChecking extends IRequestData {
  PurchaseOrderAmount: any
  TotalPaymentAmount: any
  PaymentTypeID: any
  BankName: any
  PaymentNotes: any
  BankAccountName: any
  BankRoutingNumber: any
  CheckNumber: any
  BankAccountNumber: any
  PaymentTypeName: any
  PaymentType: any
  SourceID: any
  EmailReceipt: any
}

export interface IRequestObject {
  ExpirationDate?: any
  RequestData: IExternalPayment | IAdjustFromCashAccount | ICash | ISaving | IChecking
  RequestContext: IRequestContext
  RequestComponentName: any
  PaymentGatewayAccountID?: any
  TotalPaymentAmount?: any
  PurchaserPersonID?: any
}
