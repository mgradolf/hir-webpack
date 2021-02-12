import { getMembershipProgramTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Select Date",
    fieldName: "StartDate",
    fieldName2: "EndDate",
    rules: [{ required: true, message: "This field is Required" }],
    inputType: DATE_PICKERS
  },
  {
    label: "Membership Program",
    rules: [{ required: true, message: "This field is Required" }],
    inputType: DROPDOWN,
    fieldName: "ID",
    refLookupService: getMembershipProgramTypes,
    displayKey: "Name",
    valueKey: "ID"
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    StartDate: "DisplayStartDate",
    EndDate: "DisplayEndDate"
  }
}

export default reportMeta
