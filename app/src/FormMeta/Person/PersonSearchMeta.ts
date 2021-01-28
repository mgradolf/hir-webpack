import {
  getAccountTypes,
  getAffiliationRoleType,
  getEthnicityTypes,
  getGenderTypes
} from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKER, DROPDOWN, IField, TEXT } from "~/Component/Common/SearchForm/common"
import { SearchInputType } from "~/Component/Common/SearchForm/SearchInput"
import { SearchLookupSelector } from "~/Component/Common/SearchForm/SearchSelectors/SearchComponentSelector"
import { SearchRegion } from "~/FormMeta/Person/SearchRegion"

export const PersonSearchMeta: IField[] = [
  {
    label: "Name Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Last Name",
          fieldName: "LastName",
          valueField: "LastName",
          component: SearchInputType
        },
        {
          label: "Maiden Name",
          fieldName: "MaidenName",
          valueField: "MaidenName",
          component: SearchInputType
        },
        {
          label: "Other Name",
          fieldName: "OtherName",
          valueField: "OtherName",
          component: SearchInputType
        }
      ]
    }
  },
  {
    label: "First Name",
    inputType: TEXT,
    defaultValue: "*",
    fieldName: "FirstName"
  },
  {
    label: "Contact Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Email",
          fieldName: "EmailAddress",
          valueField: "EmailAddress",
          component: SearchInputType
        },
        {
          label: "Telephone",
          fieldName: "TelephoneNumber",
          valueField: "TelephoneNumber",
          component: SearchInputType
        }
      ]
    }
  },
  {
    label: "Address Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchLookupSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Address",
          fieldName: "AddressLine",
          valueField: "Address",
          component: SearchInputType
        },
        {
          label: "City",
          fieldName: "Locality",
          valueField: "Locality",
          component: SearchInputType
        },
        {
          label: "Postal Code",
          fieldName: "PostalCode",
          valueField: "PostalCode",
          component: SearchInputType
        }
      ]
    }
  },
  {
    label: "ERP",
    inputType: TEXT,
    fieldName: "ERPID"
  },
  {
    label: "SSN",
    inputType: TEXT,
    fieldName: "GovID"
  },
  {
    label: "Birth Date",
    inputType: DATE_PICKER,
    fieldName: "BirthDate"
  },
  {
    label: "Gender",
    inputType: DROPDOWN,
    fieldName: "GenderTypeID",
    refLookupService: getGenderTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Ethnicity",
    inputType: DROPDOWN,
    fieldName: "EthnicityTypeID",
    refLookupService: getEthnicityTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Deceased",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsDeceased"
  },
  {
    label: "State/Province",
    fieldName: "RegionCodeID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchRegion
  },
  {
    label: "Account Role",
    inputType: DROPDOWN,
    fieldName: "RoleName",
    refLookupService: getAffiliationRoleType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account Type",
    inputType: DROPDOWN,
    fieldName: "AccountTypeID",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account Name",
    inputType: TEXT,
    fieldName: "AccountName"
  }
]
