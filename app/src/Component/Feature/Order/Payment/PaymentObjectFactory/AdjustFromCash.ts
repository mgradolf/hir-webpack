import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { PAYMENT_TYPE } from "~/utils/Constants"

export const getAdjustFromCashPaymentRequestObject = async (props: {
  requestComponentName: string
  PaymentTypeID: number
  paymentFormValue: { [key: string]: any }
  depositItems?: any[]
  buyer: IBuyer
  itemList: IItemRequest[]
  allocations?: IAllocation
  promoCodes: IRegistrationPromo[]
}) => {
  const depositItemExist = props.depositItems && Array.isArray(props.depositItems) && props.depositItems.length > 0
  let requestObject: IRequestObject

  if (
    props.PaymentTypeID &&
    props.depositItems &&
    depositItemExist &&
    props.buyer?.PersonProfile &&
    props.allocations?.Allocation
  ) {
    requestObject = {
      ExpirationDate: props.paymentFormValue.ExpirationDate,
      RequestData: {
        ...props.buyer.PersonProfile,
        ItemList: props.itemList,
        Allocation: props.allocations?.Allocation,
        PurchaseOrderAmount: props.allocations.NetTotalPrice,
        TotalPaymentAmount: props.allocations.TotalPaymentAmount,
        PaymentTypeID: props.PaymentTypeID,
        PaymentNotes: props.paymentFormValue.PaymentNotes,
        Description: props.paymentFormValue.Description,
        Amount: props.allocations.NetTotalPrice,
        DepositID: props.depositItems[0].TransactionID,
        TransactionNO: props.depositItems[0].TransactionNO,
        ReferenceNo: props.depositItems[0].ReferenceNo,
        TransactionID: props.depositItems[0].TransactionID,
        TransactionDate: props.depositItems[0].TransactionDate,
        RemainingAmount: props.depositItems[0].RemainingAmount,
        DepositIDList: props.depositItems?.map((x) => ({ DepositID: x.TransactionID })),
        PaymentTypeName: "Adjust From Cash Account",
        PaymentType: PAYMENT_TYPE.CashAccountPayment,
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
