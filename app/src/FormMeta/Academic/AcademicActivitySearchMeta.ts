import { CUSTOM_FIELD, DATE_PICKERS, IField, TEXT } from "~/Component/Common/SearchForm/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"

export const AcademicActivitySearchMeta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Student",
    fieldName: "StudentIDs",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton,
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
