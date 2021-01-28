import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getOfferingStatusTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/SearchForm/common"

export const ProgramOfferingSearchMeta: IField[] = [
  {
    label: "Program Offering Code",
    inputType: TEXT,
    fieldName: "programOfferingCode"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "programOfferingStatusCodeID",
    refLookupService: getOfferingStatusTypes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Program Offering Name",
    inputType: TEXT,
    fieldName: "programOfferingName"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "departmentID",
    refLookupService: getOrganizationByType,
    displayKey: "Name",
    valueKey: "ID"
  }
]
