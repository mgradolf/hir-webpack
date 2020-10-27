import { getAccountTypes, getCountries } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterFieldObject, TEXT } from "~/Component/Common/SearchFilters/common"

const programMeta: IFilterFieldObject[] = [
  {
    label: "First Name",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "FirstName",
    ariaLabel: "First Name"
  },
  {
    label: "Last Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "LastName",
    ariaLabel: "Last Name"
  },
  {
    label: "Middle Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "MiddleName",
    ariaLabel: "Middle Name"
  },
  {
    label: "Other Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "OtherName",
    ariaLabel: "Other Name"
  },
  {
    label: "Address",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "Address",
    ariaLabel: "Address"
  },
  {
    label: "City",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "City",
    ariaLabel: "City"
  },
  {
    label: "Postal Code",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "PostalCode",
    ariaLabel: "Postal Code"
  },
  {
    label: "Email",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "EmailAddress",
    ariaLabel: "Email"
  },
  {
    label: "Phone",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "TelephoneNumber",
    ariaLabel: "Phone"
  },
  {
    label: "Account Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "AccountName",
    ariaLabel: "Account Name"
  },
  {
    label: "Account Role",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "RoleName",
    ariaLabel: "Account Role",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Country",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "Name",
    ariaLabel: "Country Select",
    refLookupService: getCountries,
    displayKey: "Name",
    valueKey: "Name"
  }
]

export default programMeta
