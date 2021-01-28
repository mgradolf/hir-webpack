import { getTranscriptTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/Form/common"

const meta: IField[] = [
  {
    label: "Select Date",
    fieldName: "StartDate",
    fieldName2: "EndDate",
    inputType: DATE_PICKERS
  },
  {
    label: "Transcript Type",
    inputType: DROPDOWN,
    fieldName: "TranscriptTypeID",
    refLookupService: getTranscriptTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Official Transcript?",
    fieldName: "IsOfficialTranscript",
    inputType: BOOLEAN
  },
  {
    label: "Show Education History",
    fieldName: "ShowEducationHistory",
    inputType: BOOLEAN
  }
]

export const mapping: { [key: string]: any } = {
  StartDate: "DateFrom_DisplayOnly",
  EndDate: "DateTo_DisplayOnly"
}
export default meta

// SchoolName
// SchoolAddress
// AddressLine
