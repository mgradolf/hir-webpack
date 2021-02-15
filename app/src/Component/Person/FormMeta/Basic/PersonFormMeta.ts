import { findCountry } from "~/ApiServices/Service/PersonService"
import { DATE_PICKER, DROPDOWN, IField, MULTI_SELECT_CHECKBOX, TEXT } from "~/Component/Common/Form/common"

export const PersonFormMeta: IField[] = [
  {
    label: "Role",
    inputType: MULTI_SELECT_CHECKBOX,
    fieldName: "RoleName",
    options: [
      { label: "Student", value: "1" },
      { label: "Instructor", value: "2" },
      { label: "Purchaser", value: "3" }
    ]
  },
  {
    label: "First Name",
    inputType: TEXT,
    fieldName: "FirstName",
    rules: [{ required: true, message: "Please input your first name!" }]
  },
  {
    label: "Last Name",
    inputType: TEXT,
    fieldName: "LastName",
    rules: [{ required: true, message: "Please input your last name!" }]
  },
  {
    label: "Date Of Birth",
    inputType: DATE_PICKER,
    fieldName: "BirthDate"
  },
  {
    label: "Email",
    inputType: TEXT,
    fieldName: "EmailAddress"
  },
  {
    label: "Telephone",
    inputType: TEXT,
    fieldName: "Telephone"
  },
  {
    label: "Address",
    inputType: TEXT,
    fieldName: "Address"
  },
  {
    label: "City",
    inputType: TEXT,
    fieldName: "City"
  },
  {
    label: "State/Provincce",
    inputType: DROPDOWN,
    fieldName: "StateID"
  },
  {
    label: "Country",
    inputType: DROPDOWN,
    refLookupService: () => findCountry({}),
    displayKey: "Description",
    valueKey: "CountryID",
    fieldName: "CountryID"
  }
]
