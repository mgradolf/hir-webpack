import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import {
  getOfferingStatusTypes,
  getOfferingTypes,
  getOrganizations,
  getSectionTypes,
  getTagTypes
} from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DATE_PICKERS, DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchInstructorLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchInstructorLookup"

export const OfferingSearchMeta: IFilterField[] = [
  {
    label: "Offering Code",
    inputType: TEXT,
    fieldName: "OfferingCode"
  },
  {
    label: "Offering Name",
    inputType: TEXT,
    fieldName: "OfferingName"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Final Enrollment Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromFinalEnrollmentDate",
    valueKey: "FromFinalEnrollmentDate",

    displayKey2: "To",
    fieldName2: "ToFinalEnrollmentDate",
    valueKey2: "ToFinalEnrollmentDate"
  },
  {
    label: "Creation Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromCreationDate",
    valueKey: "FromCreationDate",
    displayKey2: "To",
    valueKey2: "ToCreationDate",
    fieldName2: "ToCreationDate"
  },
  {
    label: "Termination Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromTerminationDate",
    valueKey: "FromTerminationDate",

    displayKey2: "To",
    fieldName2: "ToTerminationDate",
    valueKey2: "ToTerminationDate"
  },
  {
    label: "QuickAdmit",
    inputType: BOOLEAN,
    fieldName: "IsQuickAdmit"
  },
  {
    label: "Offering Status",
    inputType: DROPDOWN,
    fieldName: "StatusID",
    refLookupService: getOfferingStatusTypes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Offering Type",
    inputType: DROPDOWN,
    refLookupService: getOfferingTypes,
    fieldName: "OfferingTypeID",
    displayKey: "Name",
    valueKey: "OfferingTypeID"
  },
  {
    label: "Coordinator",
    inputType: DROPDOWN,
    fieldName: "Coordinator",
    refLookupService: () => getUsersByRole({ Role: "coordinator" }),
    displayKey: "FormattedName",
    valueKey: "UserLogin"
  },
  {
    label: "Section Type",
    inputType: DROPDOWN,
    fieldName: "SectionTypeID",
    refLookupService: getSectionTypes,
    displayKey: "SectionTypeName",
    valueKey: "SectionTypeID"
  },
  {
    label: "Is Search Tag Hierarchy",
    inputType: BOOLEAN,
    fieldName: "IsSearhTagHierarchy"
  },
  {
    label: "Tag Type",
    inputType: DROPDOWN,
    fieldName: "TagTypeID",
    refLookupService: getTagTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Tag",
    inputType: TEXT,
    fieldName: "TagName"
  },
  {
    label: "Capacity Util",
    inputType: NUMBER,
    fieldName: "OfferingNearCapacity"
  },
  {
    label: "Show Program Offering",
    inputType: BOOLEAN,
    fieldName: "ShowPrgramOffering"
  },
  {
    label: "Instructor",
    fieldName: "FacultyID",
    customFilterComponent: SearchInstructorLookupButton
  }
]
