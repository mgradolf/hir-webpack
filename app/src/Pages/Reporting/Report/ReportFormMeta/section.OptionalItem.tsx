import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { ProductLookup } from "~/Component/Common/Form/FormLookupFields/ProductLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"
import { ResourceLookup } from "~/Component/Common/Form/FormLookupFields/ResourceLookup"

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
    label: "Person",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Resources",
    fieldName: "ResourceID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ResourceLookup,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Section Date",
    fieldName: "StartDateFrom",
    fieldName2: "StartDateTo",
    inputType: DATE_PICKERS
  },
  {
    label: "Purchaser",
    fieldName: "ProductID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProductLookup
  }
]

const reportMeta: IReportMeta = {
  meta,
  atLeastOneRequiredfield: true
}

export default reportMeta
