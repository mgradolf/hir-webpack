import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { PAYMENT_TYPE } from "~/utils/Constants"

export const getExternalPaymentRequestObject = async (props: {
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
        SuccessPath: "admin_success",
        FailurePath: "admin_failed",
        PaymentTypeName: "External Payment",
        PaymentType: PAYMENT_TYPE.ExternalGatewayPayment,
        SourceID: 3,
        EmailReceipt: true
      },
      RequestContext: {
        SourceID: 3,
        RequesterStaffUserName: "joeAdmin123"
      },
      RequestComponentName: props.requestComponentName,
      PaymentGatewayAccountID: 12,
      TotalPaymentAmount: props.allocations.TotalPaymentAmount
    }
    return requestObject
  }
}
