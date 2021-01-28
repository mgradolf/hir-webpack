import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { getSectionRosterStatusCode } from "~/ApiServices/Service/RefLookupService"

export const EnrollmentSearchMeta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
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
