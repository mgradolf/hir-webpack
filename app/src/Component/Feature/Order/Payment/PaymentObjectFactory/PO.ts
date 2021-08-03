import { FormInstance } from "antd/lib/form"
import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { PAYMENT_TYPE } from "~/utils/Constants"

export const getPORequestObject = async (props: {
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
        PaymentTypeName: "Purchase Orde",
        PaymentType: PAYMENT_TYPE.MiscellaneousPayment,
        SourceID: 3,
        EmailReceipt: true,

        ShowRenewLink: false,

        PONumber: props.PaymentFormInstance.getFieldValue("PONumber"),
        PaymentDueDate: props.PaymentFormInstance.getFieldValue("PaymentDueDate"),
        Description: props.PaymentFormInstance.getFieldValue("Description"),
        ContactPerson: props.PaymentFormInstance.getFieldValue("ContactPerson"),
        Telephone: props.PaymentFormInstance.getFieldValue("Telephone"),
        Address1: props.PaymentFormInstance.getFieldValue("Address1"),
        Address2: props.PaymentFormInstance.getFieldValue("Address2"),
        Address3: props.PaymentFormInstance.getFieldValue("Address3"),
        City: props.PaymentFormInstance.getFieldValue("City"),
        RegionCodeID: props.PaymentFormInstance.getFieldValue("RegionCodeID"),
        RegionName: props.PaymentFormInstance.getFieldValue("RegionName"),
        CountryCodeID: props.PaymentFormInstance.getFieldValue("CountryCodeID"),
        Note: props.PaymentFormInstance.getFieldValue("Note"),
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
