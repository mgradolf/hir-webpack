import { message } from "antd"
import { FormInstance } from "antd/lib/form"
import { IRequestObject } from "~/Component/Feature/Payment/PaymentObjectFactory/Interfaces"

export const getAdjustFromCashPaymentRequestObject = async (props: {
  selectedPayment?: { [key: string]: any }
  setSelectedPayment: (Params?: { [key: string]: any }) => void
  formInstance: FormInstance
  selectedPayer?: any
  selectedOrderItems: any[]
  allocatedItems: any[]
  PersonFormInstance: FormInstance
  PaymentFormInstance: FormInstance
  depositItems?: any[]
}) => {
  const person = await props.PersonFormInstance.validateFields()
  const payerExist = person && props.selectedPayer
  if (!payerExist) return

  const allocatedItemsExist = props.allocatedItems && props.allocatedItems.length > 0
  if (!allocatedItemsExist) message.warning("Please Select Order Items")
  const balance = allocatedItemsExist ? props.selectedOrderItems.reduce((acc, curr) => acc + curr.Balance, 0) : 0

  const __ = await props.PaymentFormInstance.validateFields()
  const depositItemExist = props.depositItems && Array.isArray(props.depositItems) && props.depositItems.length > 0
  let requestObject: IRequestObject

  console.log("allocatedItemsExist  ", allocatedItemsExist)
  console.log("props.selectedPayment  ", props.selectedPayment)
  console.log("props.depositItems  ", props.depositItems)
  console.log("depositItemExist ", depositItemExist)

  if (payerExist && allocatedItemsExist && props.selectedPayment && props.depositItems && depositItemExist) {
    requestObject = {
      ExpirationDate: __.ExpirationDate,
      RequestData: {
        ...props.selectedPayer[0],
        Allocation: props.allocatedItems,
        PurchaseOrderAmount: balance,
        TotalPaymentAmount: balance,
        PaymentTypeID: props.selectedPayment.PaymentTypeID,
        PaymentNotes: __.PaymentNotes,
        Description: __.Description,
        Amount: balance,
        DepositID: props.depositItems[0].TransactionID,
        TransactionNO: props.depositItems[0].TransactionNO,
        ReferenceNo: props.depositItems[0].ReferenceNo,
        TransactionID: props.depositItems[0].TransactionID,
        TransactionDate: props.depositItems[0].TransactionDate,
        RemainingAmount: props.depositItems[0].RemainingAmount,
        DepositIDList: props.depositItems?.map((x) => ({ DepositID: x.TransactionID })),
        PaymentTypeName: "Adjust From Cash Account",
        PaymentType: "CashAccountPayment",
        SourceID: 3,
        EmailReceipt: false
      },
      RequestContext: {
        SourceID: 3,
        RequesterStaffUserName: "joeAdmin123"
      },
      RequestComponentName: "PaymentOnly",
      TotalPaymentAmount: balance
    }
    return requestObject
  }
}
