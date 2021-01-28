import { getCountries } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/SearchForm/common"

export const studentSearchMeta: IField[] = [
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
