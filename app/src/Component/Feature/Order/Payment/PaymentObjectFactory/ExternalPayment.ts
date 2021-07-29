import { FormInstance } from "antd/lib/form"
import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"

export const getExternalPaymentRequestObject = async (props: {
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
        PaymentNotes: props.PaymentFormInstance.getFieldValue("PaymentNotes"),
        ItemList: props.itemList,
        Allocation: props.allocations?.Allocation,
        PurchaseOrderAmount: props.allocations.NetTotalPrice,
        TotalPaymentAmount: props.allocations.TotalPaymentAmount,
        PaymentTypeID: props.PaymentTypeID,
        SuccessPath: "admin_success",
        FailurePath: "admin_failed",
        PaymentTypeName: "External Payment",
        PaymentType: "ExternalGatewayPayment",
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
