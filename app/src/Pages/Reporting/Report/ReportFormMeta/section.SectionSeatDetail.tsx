import { getOrganizations, getSectionStatusCode } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { SearchOfferingLookupButton } from "~/Component/Common/Form/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
import { SearchLookupSelector } from "~/Component/Common/Form/SearchSelectors/SearchComponentSelector"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Section",
          fieldName: "SectionID",
          valueField: "SectionID",
          component: SearchSectionLookupButton
        },
        {
          label: "Offering",
          fieldName: "OfferingID",
          valueField: "OfferingID",
          component: SearchOfferingLookupButton
        }
      ]
    }
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "SectionStatusCodeID",
    refLookupService: getSectionStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Final Enrollment Date",
    fieldName: "FromEnrollDate",
    fieldName2: "ToEnrollDate",
    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
