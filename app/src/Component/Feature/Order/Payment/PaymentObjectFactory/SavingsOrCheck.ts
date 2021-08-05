import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { PAYMENT_TYPE } from "~/utils/Constants"

export const getSavingsOrCheckPaymentRequestObject = async (props: {
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
        Allocation: props.allocations?.Allocation,
        ItemList: props.itemList,
        TransactionNumber: "1",
        PurchaseOrderAmount: props.allocations.NetTotalPrice,
        TotalPaymentAmount: props.allocations.TotalPaymentAmount,
        PaymentTypeID: props.PaymentTypeID,
        BankName: "DBBL",
        PaymentNotes: props.paymentFormValue.PaymentNotes,
        BankAccountName: props.paymentFormValue.BankAccountName,
        BankRoutingNumber: props.paymentFormValue.BankRoutingNumber,
        CheckNumber: props.paymentFormValue.CheckNumber,
        BankAccountNumber: props.paymentFormValue.BankAccountNumber,
        PaymentTypeName: "Checking",
        PaymentType: PAYMENT_TYPE.BankAccountPayment,
        SourceID: 3,
        EmailReceipt: false
      },
      RequestContext: {
        SourceID: 3,
        RequesterStaffUserName: "joeAdmin123"
      },
      RequestComponentName: props.requestComponentName,
      TotalPaymentAmount: props.allocations.TotalPaymentAmount
    }
    return requestObject
  }
}
