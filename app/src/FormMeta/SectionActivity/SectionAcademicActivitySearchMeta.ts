import { DATE_PICKERS, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import StudentSearchFilterByNameID from "~/FormMeta/SectionActivity/StudentSearchFilterByNameID"

export function getSectionAcademicActivitySearchMeta(SectionID: number): IFilterField[] {
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
      fieldName: "SiteID",
      customFilterComponent: StudentSearchFilterByNameID
    }
  ]
}
