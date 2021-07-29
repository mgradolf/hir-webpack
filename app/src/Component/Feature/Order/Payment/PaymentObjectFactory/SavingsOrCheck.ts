import { FormInstance } from "antd/lib/form"
import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"

export const getSavingsOrCheckPaymentRequestObject = async (props: {
  requestComponentName: string
  PaymentTypeID: number
  PaymentFormInstance: FormInstance
  buyer: IBuyer
  itemList: IItemRequest[]
  allocations?: IAllocation
  promoCodes: IRegistrationPromo[]
}) => {
  let requestObject: IRequestObject

  if (props.buyer?.PersonProfile && props.allocations?.Allocation) {
    requestObject = {
      ExpirationDate: props.PaymentFormInstance.getFieldValue("ExpirationDate"),
      RequestData: {
        ...props.buyer.PersonProfile,
        Allocation: props.allocations?.Allocation,
        ItemList: props.itemList,
        TransactionNumber: "1",
        PurchaseOrderAmount: props.allocations.NetTotalPrice,
        TotalPaymentAmount: props.allocations.TotalPaymentAmount,
        PaymentTypeID: props.PaymentTypeID,
        BankName: "DBBL",
        PaymentNotes: props.PaymentFormInstance.getFieldValue("PaymentNotes"),
        BankAccountName: props.PaymentFormInstance.getFieldValue("BankAccountName"),
        BankRoutingNumber: props.PaymentFormInstance.getFieldValue("BankRoutingNumber"),
        CheckNumber: props.PaymentFormInstance.getFieldValue("CheckNumber"),
        BankAccountNumber: props.PaymentFormInstance.getFieldValue("BankAccountNumber"),
        PaymentTypeName: "Checking",
        PaymentType: "BankAccountPayment",
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
