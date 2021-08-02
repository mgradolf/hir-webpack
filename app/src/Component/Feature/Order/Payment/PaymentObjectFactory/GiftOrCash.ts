import { FormInstance } from "antd/lib/form"
import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { PAYMENT_TYPE } from "~/utils/Constants"

export const getGiftOrCashPaymentRequestObject = async (props: {
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
        PurchaseOrderAmount: props.allocations.NetTotalPrice,
        TotalPaymentAmount: props.allocations.TotalPaymentAmount,
        PaymentTypeID: props.PaymentTypeID,
        PaymentNotes: props.PaymentFormInstance.getFieldValue("PaymentNotes"),
        TransactionNumber: "1",
        PaymentTypeName: "Cash",
        PaymentType: PAYMENT_TYPE.MiscellaneousPayment,
        SourceID: 3,
        EmailReceipt: false
      },
      RequestContext: {
        SourceID: 3,
        RequesterStaffUserName: "joeAdmin123"
      },
      RequestComponentName: props.requestComponentName,
      PurchaserPersonID: props.buyer?.PersonID,
      TotalPaymentAmount: props.allocations.TotalPaymentAmount
    }
    return requestObject
  }
}
