import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"
import { getSectionRosterStatusCode } from "~/ApiServices/Service/RefLookupService"

export const ForgetMeRequestSearchMeta: IFilterField[] = [
  {
    label: "Section",
    fieldName: "SectionIDs",
    customFilterComponent: SearchSectionLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Activity By",
    inputType: TEXT,
    fieldName: "UserID",
    ariaLabel: "Activity By User ID"
  },
  {
    label: "Activity Date",
    inputType: DATE_PICKERS,
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
    label: "Enrollment Status",
    inputType: DROPDOWN,
    fieldName: "SectionRosterStatusCodeID",
    ariaLabel: "Enrollment Status",
    refLookupService: getSectionRosterStatusCode,
    displayKey: "Name",
    valueKey: "ID"
  }
]
