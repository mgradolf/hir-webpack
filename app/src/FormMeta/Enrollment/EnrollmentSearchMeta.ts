import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/SearchForm/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchForm/SearchLookups/SearchStudentLookup"
import { getSectionRosterStatusCode } from "~/ApiServices/Service/RefLookupService"

export const EnrollmentSearchMeta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Enrollment Status",
    inputType: DROPDOWN,
    fieldName: "SectionRosterStatusCodeID",
    refLookupService: getSectionRosterStatusCode,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Status Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromStatusDate",
    valueKey: "FromStatusDate",
    displayKey2: "To",
    fieldName2: "ToStatusDate",
    valueKey2: "ToStatusDate"
  }
]
