import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import { DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

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
          valueKey: "SectionID",
          component: OfferingLookupButton
        }
      ]
    }
  },
  {
    label: "Coordinator",
    inputType: DROPDOWN,
    fieldName: "Coordinator",
    refLookupService: () => getUsersByRole({ Role: "coordinator" }),
    displayKey: "FormattedName",
    valueKey: "UserLogin"
  }
]

const reportMeta: IReportMeta = {
  meta,
  atLeastOneRequiredfield: true
}

export default reportMeta
