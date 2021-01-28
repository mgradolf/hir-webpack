import { getOPCStatusCode } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"

export const ActivityOrderSearchMeta: IField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionIDs",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "User ID",
    inputType: TEXT,
    fieldName: "UserID"
  },
  {
    label: "Order Status",
    inputType: DROPDOWN,
    fieldName: "OrderStatusID",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Order Activity",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromDate",
    valueKey: "FromDate",
    displayKey2: "To",
    fieldName2: "ToDate",
    valueKey2: "ToDate"
  }
]
