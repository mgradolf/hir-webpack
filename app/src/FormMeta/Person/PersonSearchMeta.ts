import {
  getAccountTypes,
  getAffiliationRoleType,
  getCountries,
  getEthnicityTypes,
  getGenderTypes
} from "~/ApiServices/Service/RefLookupService"
import {
  BOOLEAN,
  DATE_PICKER,
  DROPDOWN,
  IFilterFieldObject,
  NUMBER,
  TEXT
} from "~/Component/Common/SearchFilters/common"

export const PersonSearchMeta: IFilterFieldObject[] = [
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
    label: "ERP",
    inputType: NUMBER,
    defaultValue: "",
    fieldName: "ERPCode",
    ariaLabel: "ERP Code"
  },
  {
    label: "SSN",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "SSN",
    ariaLabel: "GovID"
  },
  // {
  //   label: "State/Province",
  //   inputType: DROPDOWN,
  //   defaultValue: "",
  //   fieldName: "RoleName",
  //   ariaLabel: "State/Province",
  //   refLookupService: getAffiliationRoleType,
  //   displayKey: "Name",
  //   valueKey: "ID"
  // },
  {
    label: "Birth Date",
    inputType: DATE_PICKER,
    defaultValue: "",
    fieldName: "BirthDate",
    ariaLabel: "Birth Date"
  },
  {
    label: "Ethnicity",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "EthnicityTypeID",
    ariaLabel: "Ethnicity",
    refLookupService: getEthnicityTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Gender",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "GenderTypeID",
    ariaLabel: "Gender",
    refLookupService: getGenderTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account Type",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "AccountTypeID",
    ariaLabel: "Account Type",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Is Deceased",
    inputType: BOOLEAN,
    defaultValue: "",
    fieldName: "IsDeceased",
    ariaLabel: "Is Deceased"
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
    refLookupService: getAffiliationRoleType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Country",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "CountryCodeID",
    ariaLabel: "Country Select",
    refLookupService: getCountries,
    displayKey: "Description",
    valueKey: "ID"
  }
]
