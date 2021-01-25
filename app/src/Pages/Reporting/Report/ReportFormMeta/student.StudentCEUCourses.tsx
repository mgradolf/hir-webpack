import { getTranscriptTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"

import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Student",
    fieldName: "StudentID",
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
