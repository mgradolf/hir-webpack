import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const CertificateSearchMeta: IFilterField[] = [
  {
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookup
  },
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Issue Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
    fieldName: "IssueDateFrom",
    valueKey: "IssueDateFrom",
    ariaLabel: "Issue Date From",
    displayKey2: "To",
    valueKey2: "IssueDateTo",
    fieldName2: "IssueDateTo",
    ariaLabel2: "Issue Date To"
  },
  {
    label: "Expiration Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
    fieldName: "ExpiryDateFrom",
    valueKey: "ExpiryDateFrom",
    ariaLabel: "Expiration Date From",
    displayKey2: "To",
    valueKey2: "ExpiryDateTo",
    fieldName2: "ExpiryDateTo",
    ariaLabel2: "Expiration Date To"
  }
]
