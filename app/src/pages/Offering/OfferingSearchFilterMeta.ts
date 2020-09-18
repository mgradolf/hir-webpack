import { getUsersByRole } from "~/ApiServices/Service/HRUserService"
import {
  getOfferingStatusTypes,
  getOfferingTypes,
  getOrganizations,
  getSectionTypes,
  getTagTypes
} from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/SearchFilters/common"

const offeringMeta: IFilterField[] = [
  {
    label: "Offering Code",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "OfferingCode",
    ariaLabel: "Offering Code"
  },
  {
    label: "Offering Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "OfferingName",
    ariaLabel: "Offering Name"
  },
  {
    label: "Creation Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
    fieldName: "FromCreationDate",
    valueKey: "FromCreationDate",
    ariaLabel: "Creation Date From",
    displayKey2: "To",
    valueKey2: "ToCreationDate",
    fieldName2: "ToCreationDate",
    ariaLabel2: "Creation Date To"
  },
  {
    label: "Termination Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromTerminationDate",
    valueKey: "FromTerminationDate",
    defaultValue: "",
    ariaLabel: "Termination Date From",
    displayKey2: "To",
    fieldName2: "ToTerminationDate",
    valueKey2: "ToTerminationDate",
    ariaLabel2: "Termination Date To"
  },
  {
    label: "Is QuickAdmit",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "IsQuickAdmit",
    ariaLabel: "Is Quick Admit",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Offering Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "StatusID",
    ariaLabel: "Offering Status Select",
    refLookupService: getOfferingStatusTypes,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Offering Type",
    inputType: DROPDOWN,
    defaultValue: "",
    refLookupService: getOfferingTypes,
    fieldName: "OfferingTypeID",
    ariaLabel: "Offering Type",
    displayKey: "Name",
    valueKey: "OfferingTypeID"
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrganizationTypeID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationTypeID"
  },
  {
    label: "Coordinator",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "Coordinator",
    ariaLabel: "Coordinator Select",
    refLookupService: () => getUsersByRole({ Role: "coordinator" }),
    displayKey: "FormattedName",
    valueKey: "UserLogin"
  },
  {
    label: "Section Type",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "SectionTypeID",
    ariaLabel: "Section Type Select",
    refLookupService: getSectionTypes,
    displayKey: "SectionTypeName",
    valueKey: "SectionTypeID"
  },
  {
    label: "Is Search Tag Hierarchy",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "IsSearchTagHierarchy",
    ariaLabel: "Is Search Tag Hierarchy",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Tag Type",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "TagTypeID",
    ariaLabel: "Tag Type Select",
    refLookupService: getTagTypes,
    displayKey: "ID",
    valueKey: "Name"
  },
  {
    label: "Tag",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "TagName",
    ariaLabel: "Tag name"
  },
  {
    label: "Final Enrollment Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "FromFinalEnrollmentDate",
    valueKey: "FromFinalEnrollmentDate",
    defaultValue: "",
    ariaLabel: "Final Enrollment Date From",
    displayKey2: "To",
    fieldName2: "ToFinalEnrollmentDate",
    valueKey2: "ToFinalEnrollmentDate",
    ariaLabel2: "Final Enrollment Date To"
  },
  {
    label: "Capacity Util",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "OfferingNearCapacity",
    ariaLabel: "Offering Near Capacity"
  }
]

export default offeringMeta
