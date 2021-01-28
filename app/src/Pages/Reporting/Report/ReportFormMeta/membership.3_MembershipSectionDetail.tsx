import { getMembershipProgramTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Select Date",
    fieldName: "StartDate",
    fieldName2: "EndDate",
    inputType: DATE_PICKERS
  },
  {
    label: "Membership Program",
    inputType: DROPDOWN,
    fieldName: "MembershipProgramID",
    refLookupService: getMembershipProgramTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Section",
    fieldName: "SectionIDs",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup,
    extraProps: {
      isArray: true
    }
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    StartDate: "DisplayStartDate",
    EndDate: "DisplayEndDate"
  }
}

export default reportMeta
