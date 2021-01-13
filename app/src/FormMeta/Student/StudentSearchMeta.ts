import { getCountries } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterFieldObject, TEXT } from "~/Component/Common/SearchFilters/common"

export const studentSearchMeta: IFilterFieldObject[] = [
  {
    label: "Last Name",
    inputType: TEXT,
    fieldName: "LastName"
  },
  {
    label: "First Name",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "FirstName"
  },
  {
    label: "Email",
    inputType: TEXT,

    fieldName: "EmailAddress"
  },
  {
    label: "Telephone",
    inputType: TEXT,
    fieldName: "TelephoneNumber"
  },
  {
    label: "Middle Name",
    inputType: TEXT,

    fieldName: "MiddleName"
  },
  {
    label: "Other Name",
    inputType: TEXT,

    fieldName: "OtherName"
  },
  // {
  //   label: "Account Role",
  //   inputType: DROPDOWN,
  //   fieldName: "RoleName",
  //   refLookupService: getAccountTypes,
  //   displayKey: "Name",
  //   valueKey: "ID"
  // },
  // {
  //   label: "Account Name",
  //   inputType: TEXT,
  //   fieldName: "AccountName",
  // },

  {
    label: "Address",
    inputType: TEXT,
    fieldName: "AddressLine"
  },
  {
    label: "City",
    inputType: TEXT,
    fieldName: "Locality"
  },
  {
    label: "Postal Code",
    inputType: TEXT,
    fieldName: "PostalCode"
  },

  {
    label: "Country",
    inputType: DROPDOWN,
    fieldName: "CountryCodeID",
    refLookupService: getCountries,
    displayKey: "Description",
    valueKey: "ID"
  }
]
