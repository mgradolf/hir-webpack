import { getSectionRosterStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SectionLookupOpenButton } from "~/Component/LookupModals/SectionLookupModal"
import { SearchStudentLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const getSectionEnrollmentActivitySearchMeta: IFilterField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionIDs",
    customFilterComponent: SectionLookupOpenButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Modified By User",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "UserID",
    ariaLabel: "User ID"
  },
  {
    label: "Student Lookup",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookup,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "Enrollment Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "SectionRosterStatusCodeID",
    ariaLabel: "Enrollment Status",
    refLookupService: getSectionRosterStatusCode,
    displayKey: "Name",
    valueKey: "ID"
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
    label: "Registration Source",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "SourceID",
    ariaLabel: "Registration Source",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  }
]
