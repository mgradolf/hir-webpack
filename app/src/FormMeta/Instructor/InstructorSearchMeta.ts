import { searchOffering } from "~/ApiServices/Service/OfferingService"
import {
  getCountries,
  getEthnicityTypes,
  getGenderTypes,
  getInstitutionStatusTypes,
  getInstructorTypes,
  getOrganizations,
  getRegionCodes
} from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKER, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const InstructorSearchMeta: IFilterField[] = [
  {
    label: "Instructor ID",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "FacultySerialNum",
    ariaLabel: "Instructor ID"
  },
  {
    label: "Last Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "LastName",
    ariaLabel: "Last Name"
  },
  {
    label: "First Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "FirstName",
    ariaLabel: "First Name"
  },
  {
    label: "Instructor Type",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "InstructorTypeID",
    ariaLabel: "Instructor Type Select",
    refLookupService: getInstructorTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Qualified to Teach Offering",
    inputType: DROPDOWN, // TODO: Should be a search field
    defaultValue: "",
    fieldName: "CanTeachOfferingID",
    ariaLabel: "Qualified to Teach Offering",
    refLookupService: () => searchOffering({ OfferingCode: "*" }), // To be changed after search handler implementation
    displayKey: "OfferingCode",
    valueKey: "OfferingID"
  },
  {
    label: "Taught Offering",
    inputType: DROPDOWN, // TODO: Should be a search field
    defaultValue: "",
    fieldName: "TaughtOfferingID",
    ariaLabel: "Taught Offering",
    refLookupService: () => searchOffering({ OfferingCode: "*" }), // To be changed after search handler implementation
    displayKey: "OfferingCode",
    valueKey: "OfferingID"
  },
  {
    label: "Gender",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "GenderTypeID",
    ariaLabel: "Gender Select",
    refLookupService: getGenderTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Region",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "RegionCodeID",
    ariaLabel: "Region Select",
    refLookupService: getRegionCodes,
    displayKey: "Description",
    valueKey: "ID"
  },
  {
    label: "Ethnicity",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "EthnicityTypeID",
    ariaLabel: "Ethnicity Select",
    refLookupService: getEthnicityTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
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
  },
  {
    label: "Birthday",
    inputType: DATE_PICKER,
    fieldName: "Birthday",
    defaultValue: "",
    ariaLabel: "Birthday"
  },
  {
    label: "Telephone Number",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "TelephoneNumber",
    ariaLabel: "Telephone Number"
  },
  {
    label: "Last Taught Date",
    inputType: DATE_PICKER,
    fieldName: "LastTaughtDate",
    defaultValue: "",
    ariaLabel: "Last Taught Date"
  },
  {
    label: "Postal Code",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "PostalCode",
    ariaLabel: "Postal Code"
  },
  {
    label: "Gov ID",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "GovID",
    ariaLabel: "Gov ID"
  },
  {
    label: "Is Deceased",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "IsDeceased",
    ariaLabel: "Is Deceased",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "InstitutionStatusCodeID",
    ariaLabel: "Status Select",
    refLookupService: getInstitutionStatusTypes,
    displayKey: "Description",
    valueKey: "ID"
  }
]
