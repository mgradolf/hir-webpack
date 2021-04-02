import { DROPDOWN, IField } from "~/Component/Common/Form/common"
import { getPaymentGatewayAccounts } from "~/ApiServices/Service/RefLookupService"

export const OfferingGatewayFormMeta: IField[] = [
  {
    label: "Gateway",
    inputType: DROPDOWN,
    fieldName: "PaymentGatewayAccountID",
    refLookupService: getPaymentGatewayAccounts,
    displayKey: "Name",
    valueKey: "ID"
  }
]
