import { getMembershipProgramTypes } from "~/ApiServices/Service/RefLookupService"
import { IFilterField, DATE_PICKERS, DROPDOWN, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"

export const MembershipSearchMeta: IFilterField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Email",
    fieldName: "EmailAddress",
    inputType: TEXT
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
    label: "Renewed",
    inputType: DROPDOWN,
    fieldName: "IsRenewed",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" }
    ]
  }
  // {
  //   label: "Membership Definition ID",
  //   fieldName: "MembershipDefinitionID",
  //   inputType: NUMBER
  // }
]
