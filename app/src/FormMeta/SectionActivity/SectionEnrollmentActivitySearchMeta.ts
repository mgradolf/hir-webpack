import { getSectionRosterStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import StudentSearchFilterByNameID from "~/FormMeta/SectionActivity/StudentSearchFilterByNameID"

export function getSectionEnrollmentActivitySearchMeta(SectionID: number): IFilterField[] {
  return [
    {
      label: "",
      inputType: NUMBER,
      hidden: true,
      defaultValue: SectionID,
      fieldName: "SectionIDs",
      ariaLabel: "SectionIDs"
    },
    {
      label: "Modified By User",
      inputType: TEXT,
      defaultValue: "",
      fieldName: "UserID",
      ariaLabel: "User ID"
    },
    {
      inputType: "STUDENT_FINDER_BY_NAME_ID",
      fieldName: "StudentID",
      customFilterComponent: StudentSearchFilterByNameID
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
}
