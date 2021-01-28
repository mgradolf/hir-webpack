import { getAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/SearchForm/common"

export const AccountSearchMeta: IField[] = [
  {
    label: "Account Type",
    inputType: DROPDOWN,
    fieldName: "AccountTypeID",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account Name",
    inputType: TEXT,
    fieldName: "AccountName"
  },
  {
    label: "Contact Last Name",
    inputType: TEXT,
    fieldName: "LastName"
  },
  {
    label: "Contact First Name",
    inputType: TEXT,
    fieldName: "FirstName"
  }
]
