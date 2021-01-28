import { DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getSourceModule } from "~/ApiServices/Service/RefLookupService"

export const ForgetMeRequestSearchMeta: IField[] = [
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
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsCancelled"
  },
  {
    label: "Processed",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsProcessed"
  },
  {
    label: "Approved",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsApproved"
  }
]
