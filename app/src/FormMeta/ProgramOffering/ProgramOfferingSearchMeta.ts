import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getOfferingStatusTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const ProgramOfferingSearchMeta: IFilterField[] = [
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
    valueKey: "ID"
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
