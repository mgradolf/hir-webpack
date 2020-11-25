import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"
import { DATE_PICKERS, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

export const getSectionAcademicActivitySearchMeta: IFilterField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionIDs",
    customFilterComponent: SearchSectionLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Modified By User ID",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "UserID",
    ariaLabel: "Modified By User ID"
  },
  {
    label: "Activity Date Range",
    inputType: DATE_PICKERS,
    defaultValue: "",
    displayKey: "From",
    fieldName: "FromDate",
    valueKey: "FromDate",
    ariaLabel: "From",
    displayKey2: "To",
    fieldName2: "ToDate",
    valueKey2: "ToDate",
    ariaLabel2: "To"
  },
  {
    label: "Student Lookup",
    fieldName: "StudentIDs",
    customFilterComponent: SearchStudentLookupButton,
    extraProps: {
      isArray: true
    }
  }
]
