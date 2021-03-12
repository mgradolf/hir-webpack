import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
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
          valueField: "SectionID",
          component: SectionLookup
        },
        {
          label: "Offering",
          fieldName: "OfferingID",
          valueField: "OfferingID",
          component: OfferingLookupButton
        }
      ]
    }
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
  }
]

const reportMeta: IReportMeta = {
  meta,
  atLeastOneRequiredfield: true,
  defaultFormValue: {
    CreditAmount: 0,
    DiscountAmount: 0
  }
}

export default reportMeta
