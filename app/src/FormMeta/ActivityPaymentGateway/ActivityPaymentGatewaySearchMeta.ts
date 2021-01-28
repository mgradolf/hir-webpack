import { getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/SearchForm/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchPersonLookup"

export const ActivityPaymentGatewaySearchMeta: IField[] = [
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
    inputType: CUSTOM_FIELD,
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
