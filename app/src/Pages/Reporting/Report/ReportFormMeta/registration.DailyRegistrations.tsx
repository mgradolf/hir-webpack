import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"

const meta: IField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Section",
          fieldName: "SectionID",
          valueKey: "SectionID",
          component: SectionLookup
        },
        {
          label: "Offering",
          fieldName: "OfferingID",
          valueKey: "OfferingID",
          component: OfferingLookupButton
        }
      ]
    }
  },
  {
    label: "Registration Date",
    fieldName: "FromRegistrationDate",
    fieldName2: "ToRegistrationDate",
    inputType: DATE_PICKERS
  },
  {
    label: "Show Program Sections",
    inputType: DROPDOWN,
    fieldName: "showProgramSections",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: undefined }
    ]
  }
]

const reportMeta: IReportMeta = {
  meta,
  atLeastOneRequiredfield: true
}

export default reportMeta
