import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { SearchOfferingLookupButton } from "~/Component/Common/Form/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/Form/SearchLookups/SearchStudentLookup"
import { SearchLookupSelector } from "~/Component/Common/Form/SearchSelectors/SearchComponentSelector"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    rules: [{ required: true, message: "Offering or Section is Required" }],
    extraProps: {
      selectorKeys: [
        {
          label: "Offering",
          fieldName: "OfferingID",
          valueField: "OfferingID",
          displayField: "OfferingCode",
          component: SearchOfferingLookupButton
        },
        {
          label: "Section",
          fieldName: "SectionID",
          valueField: "SectionID",
          displayField: "SectionNumber",
          component: SearchSectionLookupButton
        }
      ]
    }
  },
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton,
    rules: [{ required: true, message: "Student is Required" }]
  },
  {
    label: "Registration Date",
    fieldName: "FromRegistrationDate",
    fieldName2: "ToRegistrationDate",
    inputType: DATE_PICKERS,
    rules: [{ required: true, message: "Registration start date or end date is Required" }]
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID",
    rules: [{ required: true, message: "Department field is Required" }]
  }
]

const reportMeta: IReportMeta = {
  meta,
  defaultFilter: {
    BalanceMoreThan: 0
  },
  mapping: {
    FromRegistrationDate: "Display_FromRegistrationDate"
  }
}

export default reportMeta
