import { getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchRequestLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchRequestLookup"

export const ActivityPaymentGatewaySearchMeta: IFilterField[] = [
  {
    label: "Request Date",
    inputType: DATE_PICKERS,
    fieldName: "RequestDateFrom",
    fieldName2: "RequestDateTo"
  },
  {
    label: "Transaction No",
    inputType: TEXT,
    fieldName: "TransactionNo"
  },
  {
    label: "Payer",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    fieldName: "SourceID",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  }
]
