import { getOPCStatusCode } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, NUMBER } from "~/Component/Common/Form/common"
import TotalAmountRange from "~/Component/Feature/Section/Order/TotalAmountRange"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { DiscountProgramLookup } from "~/Component/Common/Form/FormLookupFields/DiscountProgramLookup"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"

export const OrderCreditsSearchMeta: IField[] = [
  {
    label: "Purchaser",
    fieldName: "BuyerName",
    valueField: "FormattedName",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Section",
    fieldName: "SectionID",
    valueField: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "Credit Status",
    inputType: DROPDOWN,
    fieldName: "OPCSStatusCodeID",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Order ID",
    inputType: NUMBER,
    fieldName: "OrderID"
  },
  {
    label: "Credit Date",
    inputType: DATE_PICKERS,
    fieldName: "FromDate",
    fieldName2: "ToDate"
  },
  {
    label: "Total Amount",
    fieldName: "FromAmount",
    fieldName2: "ToAmount",
    inputType: CUSTOM_FIELD,
    customFilterComponent: TotalAmountRange
  },
  {
    label: "Discount Program",
    fieldName: "DiscountProgramID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: DiscountProgramLookup
  },
  {
    label: "Account",
    fieldName: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
  }
]
