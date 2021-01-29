import { getSectionStatusCode } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKER, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Offering Code",
    fieldName: "OfferingID",
    rules: [{ required: true, message: "Offering Code is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: OfferingLookupButton
  },
  {
    label: "Section Status",
    inputType: DROPDOWN,
    fieldName: "SectionStatusCodeID",
    refLookupService: getSectionStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Creation Date",
    fieldName: "creationDate",
    inputType: DATE_PICKER
  },
  {
    label: "Termination Date",
    inputType: DATE_PICKER,
    fieldName: "creationDate"
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
