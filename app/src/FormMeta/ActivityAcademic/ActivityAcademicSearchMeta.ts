import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"
import { CUSTOM_FIELD, DATE_PICKERS, IField, TEXT } from "~/Component/Common/SearchForm/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"

export const ActivityAcademicSearchMeta: IField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton,
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
    customFilterComponent: SearchStudentLookupButton,
    extraProps: {
      isArray: true
    }
  }
]
