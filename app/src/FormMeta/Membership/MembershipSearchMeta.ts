import { DROPDOWN, IFilterField, DATE_PICKERS, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"

export const MembershipSearchMeta: IFilterField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  //TODO: need to pass 2 keys when this option is selected EmailAddress2
  {
    label: "Email",
    inputType: TEXT,
    fieldName: "EmailAddress",
    ariaLabel: "Email"
  },
  //TODO: need to pass 2 keys when this option is selected PersonName2
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "PersonName",
    ariaLabel: "Name"
  },
  {
    label: "Expiration",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "TermExpirationDate",
    valueKey: "TermExpirationDate",
    ariaLabel: "Expiration Date From",
    displayKey2: "To",
    valueKey2: "TermExpirationDate1",
    fieldName2: "TermExpirationDate1",
    ariaLabel2: "Expiration Date To"
  },
  {
    label: "Member Since",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "MemberSince",
    valueKey: "MemberSince",
    ariaLabel: "Member Since From",
    displayKey2: "To",
    valueKey2: "MemberSince1",
    fieldName2: "MemberSince1",
    ariaLabel2: "Member Since To"
  },
  {
    label: "Renewal Period Starts",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "TermRenewalBeginDate",
    valueKey: "TermRenewalBeginDate",
    ariaLabel: "Renewal Period Starts From",
    displayKey2: "To",
    valueKey2: "TermRenewalBeginDate1",
    fieldName2: "TermRenewalBeginDate1",
    ariaLabel2: "Renewal Period Starts To"
  }
  //TODO: need to add couple of filters later 
]
