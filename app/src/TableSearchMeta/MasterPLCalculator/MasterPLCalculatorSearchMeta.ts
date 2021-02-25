import { CUSTOM_FIELD, IField, MULTI_RADIO } from "~/Component/Common/Form/common"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"

export const MasterPLCalculatorSearchMeta: IField[] = [
  {
    label: "Section",
    inputType: CUSTOM_FIELD,
    fieldName: "SectionIDs",
    customFilterComponent: SectionLookup,
    extraProps: {
      isArray: true
    },
    rules: [{ required: true, message: "Section(s) is/are Required" }]
  },
  {
    label: "Calculate P/L Using",
    inputType: MULTI_RADIO,
    fieldName: "IsActual",
    options: [
      { label: "Reserved Enrollment", value: true },
      { label: "Estimated Enrollment", value: false }
    ]
  }
]
