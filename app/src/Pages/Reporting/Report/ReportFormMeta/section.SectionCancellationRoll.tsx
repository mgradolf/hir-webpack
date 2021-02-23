import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"
import { SECTION_STATUS_CODE } from "~/utils/Constants"

const meta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    rules: [{ required: true, message: "Section is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup,
    extraProps: {
      isArray: true,
      defaultFormValue: {
        SectionStatusCodeID: SECTION_STATUS_CODE.CANCELLED
      }
    }
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
