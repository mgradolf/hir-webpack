import { message } from "antd"
import { FormInstance } from "antd/lib/form"
import { IRequestObject } from "~/Component/Feature/Payment/PaymentObjectFactory/Interfaces"

export const getSavingsOrCheckPaymentRequestObject = async (props: {
  selectedPayment?: { [key: string]: any }
  setSelectedPayment: (Params?: { [key: string]: any }) => void
  formInstance: FormInstance
  selectedPayer?: any
  selectedOrderItems: any[]
  allocatedItems: any[]
  PersonFormInstance: FormInstance
  PaymentFormInstance: FormInstance
  totalBalance: number
  totalPayment: number
}) => {
  const person = await props.PersonFormInstance.validateFields()
  const payerExist = person && props.selectedPayer
  if (!payerExist) return

  const allocatedItemsExist = props.allocatedItems && props.allocatedItems.length > 0
  if (!allocatedItemsExist) message.warning("Please Select Order Items")
  // const balance = allocatedItemsExist ? props.selectedOrderItems.reduce((acc, curr) => acc + curr.Balance, 0) : 0
  const __ = await props.PaymentFormInstance.validateFields()

  let requestObject: IRequestObject

  console.log("allocatedItemsExist  ", allocatedItemsExist)
  console.log("props.selectedPayment  ", props.selectedPayment)

  if (payerExist && allocatedItemsExist && props.selectedPayment) {
    requestObject = {
      ExpirationDate: __.ExpirationDate,
      RequestData: {
        ...props.selectedPayer,
        Allocation: props.allocatedItems,
        TransactionNumber: "1",
        PurchaseOrderAmount: props.totalBalance,
        TotalPaymentAmount: props.totalPayment,
        PaymentTypeID: props.selectedPayment.PaymentTypeID,
        BankName: "DBBL",
        PaymentNotes: __.PaymentNotes,
        BankAccountName: __.BankAccountName,
        BankRoutingNumber: __.BankRoutingNumber,
        CheckNumber: __.CheckNumber,
        BankAccountNumber: __.BankAccountNumber,
        PaymentTypeName: "Checking",
        PaymentType: "BankAccountPayment",
        SourceID: 3,
        EmailReceipt: false
      },
      RequestContext: {
        SourceID: 3,
        RequesterStaffUserName: "joeAdmin123"
      },
      RequestComponentName: "PaymentOnly",
      TotalPaymentAmount: props.totalPayment
    }
    return requestObject
  }
}
