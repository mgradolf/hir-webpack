import { getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, NUMBER } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchRequestLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchRequestLookup"

export const ActivityPaymentGatewaySearchMeta: IFilterField[] = [
  {
    label: "Payment GatewayActivity ID",
    inputType: NUMBER,
    fieldName: "PaymentGatewayActivityID"
  },
  {
    label: "Activity Status ID",
    inputType: NUMBER,
    fieldName: "ActivityStatusID"
  },
  {
    label: "Request Date",
    inputType: DATE_PICKERS,
    fieldName: "RequestDateFrom",
    fieldName2: "RequestDateTo"
  },
  {
    label: "Transaction No",
    inputType: NUMBER,
    fieldName: "TransactionNo"
  },
  {
    label: "Transaction No",
    inputType: NUMBER,
    fieldName: "TransactionNo"
  },
  {
    label: "Person",
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
  },
  {
    label: "Transaction No",
    inputType: NUMBER,
    fieldName: "TransactionNo"
  },
  {
    label: "RequestID",
    fieldName: "RequestIDs",
    customFilterComponent: SearchRequestLookup,
    extraProps: {
      isArray: true
    }
  }
]
