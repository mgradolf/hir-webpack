import { getTranscriptTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/SearchForm/common"

import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Student",
    fieldName: "StudentID",
    rules: [{ required: true, message: "Student is Required" }],
    customFilterComponent: SearchStudentLookupButton,
    inputType: CUSTOM_FIELD
  },
  {
    label: "Status Date",
    fieldName: "StatusDateFrom",
    fieldName2: "StatusDateTo",
    inputType: DATE_PICKERS
  },
  {
    label: "Transcript Type",
    inputType: DROPDOWN,
    rules: [{ required: true, message: "Transcript Type is Required" }],
    fieldName: "TranscriptTypeID",
    refLookupService: getTranscriptTypes,
    displayKey: "Name",
    valueKey: "ID"
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
