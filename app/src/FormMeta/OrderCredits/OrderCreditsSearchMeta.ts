import { getOPCStatusCode } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import TotalAmountRange from "~/Component/Section/Order/TotalAmountRange"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchDiscountProgramLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchDiscountProgramLookup"
import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"

export const OrderCreditsSearchMeta: IFilterField[] = [
  {
    label: "Purchaser",
    fieldName: "BuyerName",
    valueField: "FormattedName",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    valueField: "SectionID",
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
    customFilterComponent: TotalAmountRange
  },
  {
    label: "Discount Program",
    fieldName: "DiscountProgramID",
    customFilterComponent: SearchDiscountProgramLookup
  },
  {
    label: "Account",
    fieldName: "AccountID",
    customFilterComponent: SearchAccountLookup
  }
]
