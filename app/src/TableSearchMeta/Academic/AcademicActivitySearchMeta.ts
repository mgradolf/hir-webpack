import { CUSTOM_FIELD, DATE_PICKERS, IField, TEXT } from "~/Component/Common/Form/common"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"

export const AcademicActivitySearchMeta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Student",
    fieldName: "StudentIDs",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Activity By",
    inputType: TEXT,
    fieldName: "UserID"
  },
  {
    label: "Activity Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromDate",
    valueKey: "FromDate",
    displayKey2: "To",
    fieldName2: "ToDate",
    valueKey2: "ToDate"
  }
]
