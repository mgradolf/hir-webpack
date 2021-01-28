import { getOPCStatusCode } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, NUMBER } from "~/Component/Common/SearchForm/common"
import TotalAmountRange from "~/Component/Section/Order/TotalAmountRange"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchPersonLookup"
import { SearchDiscountProgramLookup } from "~/Component/Common/SearchForm/SearchLookups/SearchDiscountProgramLookup"
import { SearchAccountLookup } from "~/Component/Common/SearchForm/SearchLookups/SearchAccountLookup"

export const OrderCreditsSearchMeta: IField[] = [
  {
    label: "Purchaser",
    fieldName: "BuyerName",
    valueField: "FormattedName",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    valueField: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
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
    customFilterComponent: SearchDiscountProgramLookup
  },
  {
    label: "Account",
    fieldName: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchAccountLookup
  }
]
