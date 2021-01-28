import { getSectionRosterStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/Form/SearchLookups/SearchStudentLookup"

export const ActivityEnrollmentSearchMeta: IField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionIDs",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Modified By User",
    inputType: TEXT,
    fieldName: "UserID"
  },
  {
    label: "Student Lookup",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton,
    extraProps: {
      isArray: true
    }
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
    label: "Registration Source",
    inputType: DROPDOWN,
    fieldName: "SourceID",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  }
]
