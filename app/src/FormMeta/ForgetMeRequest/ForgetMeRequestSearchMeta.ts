import { BOOLEAN, DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { getSourceModule } from "~/ApiServices/Service/RefLookupService"

export const ForgetMeRequestSearchMeta: IFilterField[] = [
  {
    label: "First Name",
    inputType: TEXT,
    fieldName: "FirstName"
  },
  {
    label: "Last Name",
    inputType: TEXT,
    fieldName: "LastName"
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
    label: "Activity Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "RequestDateFrom",
    valueKey: "RequestDateFrom",
    displayKey2: "To",
    fieldName2: "RequestDateTo",
    valueKey2: "RequestDateTo"
  },
  {
    label: "Processing Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "ProcessingDateFrom",
    valueKey: "ProcessingDateFrom",
    displayKey2: "To",
    fieldName2: "ProcessingDateTo",
    valueKey2: "ProcessingDateTo"
  },
  {
    label: "Cancelled",
    inputType: BOOLEAN,
    fieldName: "IsCancelled"
  },
  {
    label: "Processed",
    inputType: BOOLEAN,
    fieldName: "IsProcessed"
  },
  {
    label: "Approved",
    inputType: BOOLEAN,
    fieldName: "IsApproved"
  }
]
