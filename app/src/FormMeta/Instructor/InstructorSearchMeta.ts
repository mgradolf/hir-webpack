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
import { BOOLEAN, DATE_PICKER, DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"

export const InstructorSearchMeta: IFilterField[] = [
  {
    label: "Instructor ID",
    inputType: TEXT,

    fieldName: "FacultySerialNum",
    ariaLabel: "Instructor ID"
  },
  {
    label: "Last Name",
    inputType: TEXT,

    fieldName: "LastName",
    ariaLabel: "Last Name"
  },
  {
    label: "First Name",
    inputType: TEXT,

    fieldName: "FirstName",
    ariaLabel: "First Name"
  },
  {
    label: "Maiden Name",
    inputType: TEXT,

    fieldName: "MaidenName",
    ariaLabel: "Maiden Name"
  },
  {
    label: "Other Name",
    inputType: TEXT,

    fieldName: "OtherName",
    ariaLabel: "Other Name"
  },
  {
    label: "Email",
    inputType: TEXT,

    fieldName: "EmailAddress",
    ariaLabel: "Email"
  },
  {
    label: "Is Active",
    inputType: BOOLEAN,

    fieldName: "IsActive",
    ariaLabel: "Is Active"
  },
  {
    label: "Able To Teach",
    inputType: BOOLEAN,

    fieldName: "IsAbleToTeach",
    ariaLabel: "Able To Teach"
  },
  {
    label: "ERP",
    inputType: NUMBER,

    fieldName: "ERPCode",
    ariaLabel: "ERP Code"
  },
  {
    label: "SSN",
    inputType: TEXT,

    fieldName: "SSN",
    ariaLabel: "GovID"
  },
  {
    label: "Instructor Type",
    inputType: DROPDOWN,

    fieldName: "InstructorTypeID",
    ariaLabel: "Instructor Type Select",
    refLookupService: getInstructorTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Qualified to Teach Offering",
    inputType: DROPDOWN, // TODO: Should be a search field

    fieldName: "CanTeachOfferingID",
    ariaLabel: "Qualified to Teach Offering",
    refLookupService: () => searchOffering({ OfferingCode: "*" }), // To be changed after search handler implementation
    displayKey: "OfferingCode",
    valueKey: "OfferingID"
  },
  {
    label: "Taught Offering",
    inputType: DROPDOWN, // TODO: Should be a search field

    fieldName: "TaughtOfferingID",
    ariaLabel: "Taught Offering",
    refLookupService: () => searchOffering({ OfferingCode: "*" }), // To be changed after search handler implementation
    displayKey: "OfferingCode",
    valueKey: "OfferingID"
  },
  {
    label: "Gender",
    inputType: DROPDOWN,

    fieldName: "GenderTypeID",
    ariaLabel: "Gender Select",
    refLookupService: getGenderTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Region",
    inputType: DROPDOWN,

    fieldName: "RegionCodeID",
    ariaLabel: "Region Select",
    refLookupService: getRegionCodes,
    displayKey: "Description",
    valueKey: "ID"
  },
  {
    label: "Ethnicity",
    inputType: DROPDOWN,

    fieldName: "EthnicityTypeID",
    ariaLabel: "Ethnicity Select",
    refLookupService: getEthnicityTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,

    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Country",
    inputType: DROPDOWN,

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

    ariaLabel: "Birthday"
  },
  {
    label: "Telephone Number",
    inputType: TEXT,

    fieldName: "TelephoneNumber",
    ariaLabel: "Telephone Number"
  },
  {
    label: "Last Taught Date",
    inputType: DATE_PICKER,
    fieldName: "LastTaughtDate",

    ariaLabel: "Last Taught Date"
  },
  {
    label: "Postal Code",
    inputType: TEXT,

    fieldName: "PostalCode",
    ariaLabel: "Postal Code"
  },
  {
    label: "Gov ID",
    inputType: TEXT,

    fieldName: "GovID",
    ariaLabel: "Gov ID"
  },
  {
    label: "Is Deceased",
    inputType: DROPDOWN,

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

    fieldName: "InstitutionStatusCodeID",
    ariaLabel: "Status Select",
    refLookupService: getInstitutionStatusTypes,
    displayKey: "Description",
    valueKey: "ID"
  }
]
