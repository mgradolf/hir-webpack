import {
  getAccountTypes,
  getAffiliationRoleType,
  getEthnicityTypes,
  getGenderTypes
} from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DATE_PICKER, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchInputType } from "~/Component/Common/SearchFilters/SearchInput"
import { SearchLookupSelector } from "~/Component/Common/SearchFilters/SearchSelectors/SearchComponentSelector"
import { SearchRegion } from "~/FormMeta/Person/SearchRegion"

export const PersonSearchMeta: IFilterField[] = [
  {
    label: "Person Selector",
    fieldName: "",
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
    fieldName: "FirstName",
    ariaLabel: "First Name"
  },
  {
    label: "Address Selector",
    fieldName: "",
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
    defaultValue: "",
    fieldName: "ERPID",
    ariaLabel: "ERP Code"
  },
  {
    label: "Contact Selector",
    fieldName: "",
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
          label: "Phone",
          fieldName: "TelephoneNumber",
          valueField: "TelephoneNumber",
          component: SearchInputType
        }
      ]
    }
  },
  {
    label: "SSN",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "GovID",
    ariaLabel: "SSN"
  },
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
    label: "Deceased",
    inputType: BOOLEAN,
    defaultValue: "",
    fieldName: "IsDeceased",
    ariaLabel: "Deceased"
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
  // {
  //   label: "Country",
  //   inputType: DROPDOWN,
  //   defaultValue: "",
  //   fieldName: "CountryCodeID",
  //   ariaLabel: "Country Select",
  //   refLookupService: getCountries,
  //   displayKey: "Description",
  //   valueKey: "ID"
  // },
  {
    label: "State/Province",
    fieldName: "RegionCodeID",
    customFilterComponent: SearchRegion
  }
]
