import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { PAYMENT_TYPE } from "~/utils/Constants"

export const getPORequestObject = async (props: {
  requestComponentName: string
  PaymentTypeID: number
  paymentFormValue: { [key: string]: any }
  buyer: IBuyer
  itemList: IItemRequest[]
  allocations?: IAllocation
  promoCodes: IRegistrationPromo[]
}) => {
  let requestObject: IRequestObject
  if (props.buyer?.PersonProfile && props.allocations?.Allocation) {
    requestObject = {
      ExpirationDate: props.paymentFormValue.ExpirationDate,
      RequestData: {
        ...props.buyer.PersonProfile,
        PaymentNotes: props.paymentFormValue.PaymentNotes,
        ItemList: props.itemList,
        Allocation: props.allocations?.Allocation,
        PurchaseOrderAmount: props.allocations.NetTotalPrice,
        TotalPaymentAmount: props.allocations.TotalPaymentAmount,
        PaymentTypeID: props.PaymentTypeID,
        PaymentTypeName: "Purchase Orde",
        PaymentType: PAYMENT_TYPE.MiscellaneousPayment,
        SourceID: 3,
        EmailReceipt: true,

        ShowRenewLink: false,

        PONumber: props.paymentFormValue.PONumber,
        PaymentDueDate: props.paymentFormValue.PaymentDueDate,
        Description: props.paymentFormValue.Description,
        ContactPerson: props.paymentFormValue.ContactPerson,
        Telephone: props.paymentFormValue.Telephone,
        Address1: props.paymentFormValue.Address1,
        Address2: props.paymentFormValue.Address2,
        Address3: props.paymentFormValue.Address3,
        City: props.paymentFormValue.City,
        RegionCodeID: props.paymentFormValue.RegionCodeID,
        RegionName: props.paymentFormValue.RegionName,
        CountryCodeID: props.paymentFormValue.CountryCodeID,
        Note: props.paymentFormValue.Note,
        CreatedBy: "Request Tester",
        // MarketingCode: 7,
        EmailInvoice: false
      },
      RequestContext: {
        SourceID: 3,
        RequesterStaffUserName: "joeAdmin123"
      },
      RequestComponentName: "OrderWithPurchaseOrder",
      PaymentGatewayAccountID: 12,
      TotalPaymentAmount: props.allocations.TotalPaymentAmount
    }
    return requestObject
  }
}
