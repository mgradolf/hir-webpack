import { getSectionRosterStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"

export const ActivityEnrollmentSearchMeta: IField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionIDs",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup,
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
    customFilterComponent: StudentLookup,
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
