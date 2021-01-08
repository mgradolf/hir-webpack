import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"

const meta: IFilterField[] = [
  {
    label: "Person Selector",
    fieldName: "",
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Offering",
          fieldName: "Offering",
          valueField: "FormattedName",
          component: SearchOfferingLookupButton
        },
        {
          label: "Section",
          fieldName: "SectionID",
          valueField: "FormattedName",
          component: SearchSectionLookupButton
        }
      ]
    }
  },
  {
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Registration Date",
    fieldName: "FromRegistrationDate",
    fieldName2: "ToRegistrationDate",
    inputType: DATE_PICKERS
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  }
]

export default meta
