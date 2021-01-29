import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Offering",
    fieldName: "OfferingID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: OfferingLookupButton,
    rules: [{ required: true, message: "Offering is Required" }]
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
