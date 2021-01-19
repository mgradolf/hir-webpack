import {
  getEthnicityTypes,
  getGenderTypes,
  getInstitutionStatusTypes,
  getInstructorTypes,
  getOrganizations
} from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DATE_PICKER, DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"
import { SearchRegion } from "~/FormMeta/Person/SearchRegion"

export const InstructorSearchMeta: IFilterField[] = [
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
    label: "Email",
    inputType: TEXT,
    fieldName: "EmailAddress",
    ariaLabel: "Email"
  },
  {
    label: "Telephone",
    inputType: TEXT,
    fieldName: "TelephoneNumber",
    ariaLabel: "Telephone Number"
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
    label: "Gender",
    inputType: DROPDOWN,
    fieldName: "GenderTypeID",
    ariaLabel: "Gender Select",
    refLookupService: getGenderTypes,
    displayKey: "Name",
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
    label: "SSN",
    inputType: TEXT,
    fieldName: "SSN",
    ariaLabel: "GovID"
  },
  {
    label: "ERP",
    inputType: NUMBER,
    fieldName: "ERPCode",
    ariaLabel: "ERP Code"
  },
  {
    label: "Birthday",
    inputType: DATE_PICKER,
    fieldName: "Birthday",
    ariaLabel: "Birthday"
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
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
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
    label: "Able To Teach",
    inputType: BOOLEAN,
    fieldName: "IsAbleToTeach",
    ariaLabel: "Able To Teach"
  },
  {
    label: "Is Active",
    inputType: BOOLEAN,
    fieldName: "IsActive",
    ariaLabel: "Is Active"
  },
  {
    label: "Qualified to Teach Offering",
    fieldName: "CanTeachOfferingID",
    customFilterComponent: SearchOfferingLookupButton,
    displayKey: "OfferingCode",
    valueKey: "OfferingID"
  },
  {
    label: "Taught Offering",
    fieldName: "TaughtOfferingID",
    customFilterComponent: SearchOfferingLookupButton,
    displayKey: "OfferingCode",
    valueKey: "OfferingID"
  },
  {
    label: "Last Taught Date",
    inputType: DATE_PICKER,
    fieldName: "LastTaughtDate",
    ariaLabel: "Last Taught Date"
  },
  {
    label: "Status",
    inputType: DROPDOWN,
    fieldName: "InstitutionStatusCodeID",
    ariaLabel: "Status Select",
    refLookupService: getInstitutionStatusTypes,
    displayKey: "Description",
    valueKey: "ID"
  },
  {
    label: "State/Province",
    fieldName: "RegionCodeID",
    customFilterComponent: SearchRegion
  },
  {
    label: "SSN",
    inputType: TEXT,
    fieldName: "GovID",
    ariaLabel: "Gov ID"
  }
]
