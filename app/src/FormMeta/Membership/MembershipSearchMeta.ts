import { IFilterField, DATE_PICKERS, NUMBER } from "~/Component/Common/SearchFilters/common"
import { BooleanInputType } from "~/Component/Common/SearchFilters/SearchBooleanInput"
import { SearchInputType } from "~/Component/Common/SearchFilters/SearchInput"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"

export const MembershipSearchMeta: IFilterField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Lookup",
    fieldName: "",
    fullWidth: true,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Email",
          fieldName: "EmailAddress",
          component: SearchInputType
        },
        {
          label: "Email 2",
          fieldName: "EmailAddress2",
          component: SearchInputType
        }
      ]
    }
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
    label: "Membership ID",
    fieldName: "MembershipID",
    inputType: NUMBER
  },
  {
    label: "Membership Program ID",
    fieldName: "MembershipProgramID",
    inputType: NUMBER
  },
  {
    label: "Membership Definition ID",
    fieldName: "MembershipDefinitionID",
    inputType: NUMBER
  },
  {
    label: "Lookup",
    fieldName: "",
    fullWidth: true,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "IsRenewed",
          fieldName: "IsRenewed",
          component: BooleanInputType
        },
        {
          label: "IsRenewed 2",
          fieldName: "IsRenewed2",
          component: BooleanInputType
        }
      ]
    }
  }
]
