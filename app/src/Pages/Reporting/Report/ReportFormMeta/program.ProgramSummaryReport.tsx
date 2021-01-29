import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { ProgramLookup } from "~/Component/Common/Form/FormLookupFields/ProgramLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Selected Program",
    fieldName: "ProgramID",
    rules: [{ required: true, message: "Program is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProgramLookup
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
