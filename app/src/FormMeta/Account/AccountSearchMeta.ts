import { getAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const AccountSearchMeta: IFilterField[] = [
  {
    label: "Account Type",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "AccountTypeID",
    ariaLabel: "Account Type Select",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "AccountName",
    ariaLabel: "Account Name"
  },
  {
    label: "Contact Last Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "LastName",
    ariaLabel: "Last Name"
  },
  {
    label: "Contact First Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "FirstName",
    ariaLabel: "First Name"
  }
]
