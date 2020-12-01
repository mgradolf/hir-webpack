import { getAccountTypes, getCountries } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterFieldObject, TEXT } from "~/Component/Common/SearchFilters/common"

export const studentSearchMeta: IFilterFieldObject[] = [
  {
    label: "Last Name",
    inputType: TEXT,
    fieldName: "LastName",
    ariaLabel: "Last Name"
  },
  {
    label: "First Name",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "FirstName",
    ariaLabel: "First Name"
  },
  {
    label: "Email",
    inputType: TEXT,

    fieldName: "EmailAddress",
    ariaLabel: "Email"
  },
  {
    label: "Telephone",
    inputType: TEXT,
    fieldName: "TelephoneNumber",
    ariaLabel: "Phone"
  },
  {
    label: "Middle Name",
    inputType: TEXT,

    fieldName: "MiddleName",
    ariaLabel: "Middle Name"
  },
  {
    label: "Other Name",
    inputType: TEXT,

    fieldName: "OtherName",
    ariaLabel: "Other Name"
  },
  {
    label: "Address",
    inputType: TEXT,

    fieldName: "Address",
    ariaLabel: "Address"
  },
  {
    label: "City",
    inputType: TEXT,

    fieldName: "City",
    ariaLabel: "City"
  },
  {
    label: "Postal Code",
    inputType: TEXT,

    fieldName: "PostalCode",
    ariaLabel: "Postal Code"
  },

  {
    label: "Account Name",
    inputType: TEXT,

    fieldName: "AccountName",
    ariaLabel: "Account Name"
  },
  {
    label: "Account Role",
    inputType: DROPDOWN,

    fieldName: "RoleName",
    ariaLabel: "Account Role",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Country",
    inputType: DROPDOWN,

    fieldName: "CountryCodeID",
    ariaLabel: "Country Select",
    refLookupService: getCountries,
    displayKey: "Description",
    valueKey: "ID"
  }
]
