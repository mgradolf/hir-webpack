import { message } from "antd"
import { FormInstance } from "antd/lib/form"
import { IRequestObject } from "~/Component/Feature/Payment/PaymentObjectFactory/Interfaces"

export const getExternalPaymentRequestObject = async (props: {
  selectedPayment?: { [key: string]: any }
  setSelectedPayment: (Params?: { [key: string]: any }) => void
  formInstance: FormInstance
  selectedPayer?: any
  selectedOrderItems: any[]
  allocatedItems: any[]
  PersonFormInstance: FormInstance
  PaymentFormInstance: FormInstance
}) => {
  const person = await props.PersonFormInstance.validateFields()
  const payerExist = person && Array.isArray(props.selectedPayer) && props.selectedPayer.length > 0
  if (!payerExist) return
  const allocatedItemsExist = props.allocatedItems && props.allocatedItems.length > 0
  if (!allocatedItemsExist) message.warning("Please Select Order Items")
  const balance = allocatedItemsExist ? props.selectedOrderItems.reduce((acc, curr) => acc + curr.Balance, 0) : 0

  const __ = await props.PaymentFormInstance.validateFields()
  let requestObject: IRequestObject
  if (payerExist && allocatedItemsExist && props.selectedPayment) {
    requestObject = {
      ExpirationDate: __.ExpirationDate,
      RequestData: {
        ...props.selectedPayer[0],
        PaymentNotes: __.PaymentNotes,
        Allocation: props.allocatedItems,
        PurchaseOrderAmount: balance,
        TotalPaymentAmount: balance,
        PaymentTypeID: props.selectedPayment.PaymentTypeID,
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
      RequestComponentName: "PaymentOnly",
      PaymentGatewayAccountID: 12,
      TotalPaymentAmount: balance
    }
    return requestObject
  }
}
