import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { CUSTOM_FIELD, DATE_PICKERS, IField, TEXT } from "~/Component/Common/Form/common"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"

export const ActivityAcademicSearchMeta: IField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Modified By User ID",
    inputType: TEXT,
    fieldName: "UserID"
  },
  {
    label: "Activity Date Range",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromDate",
    valueKey: "FromDate",
    displayKey2: "To",
    fieldName2: "ToDate",
    valueKey2: "ToDate"
  },
  {
    label: "Student Lookup",
    fieldName: "StudentIDs",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup,
    extraProps: {
      isArray: true
    }
  }
]
