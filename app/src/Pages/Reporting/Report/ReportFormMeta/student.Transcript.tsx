import { getTranscriptTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, CUSTOM_FIELD, DATE_PICKER, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"

const meta: IField[] = [
  {
    label: "Student",
    fieldName: "StudentID",
    rules: [{ required: true, message: "Student is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
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
    label: "Start Date",
    fieldName: "StartDate",
    inputType: DATE_PICKER
  },
  {
    label: "End Date",
    fieldName: "EndDate",
    inputType: DATE_PICKER
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

const reportMeta: IReportMeta = {
  meta,
  atLeastOneRequiredfield: true,
  mapping: {
    StartDate: "DateFrom_DisplayOnly",
    EndDate: "DateTo_DisplayOnly"
  },
  initialFormValue: {
    TranscriptTypeID: 2,
    IsOfficialTranscript: true
  },
  defaultFormValue: {
    SectionStatusCodeID: 4
  }
}
export default reportMeta
