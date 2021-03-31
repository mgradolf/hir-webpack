import {
  getAccountTypes,
  getAffiliationRoleType,
  getEthnicityTypes,
  getGenderTypes
} from "~/ApiServices/Service/RefLookupService"
import { CUSTOM_FIELD, DATE_PICKER, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
import { SearchRegion } from "~/Component/Common/Form/CustomFormFields/SearchRegion"

export const PersonSearchMeta: IField[] = [
  {
    label: "Name Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Last Name",
          fieldName: "LastName",
          valueKey: "LastName",
          component: FormInput
        },
        {
          label: "Maiden Name",
          fieldName: "MaidenName",
          valueKey: "MaidenName",
          component: FormInput
        },
        {
          label: "Other Name",
          fieldName: "OtherName",
          valueKey: "OtherName",
          component: FormInput
        }
      ]
    }
  },
  {
    label: "First Name",
    inputType: TEXT,
    fieldName: "FirstName"
  },
  {
    label: "Contact Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Email",
          fieldName: "EmailAddress",
          valueKey: "EmailAddress",
          component: FormInput
        },
        {
          label: "Telephone",
          fieldName: "TelephoneNumber",
          valueKey: "TelephoneNumber",
          component: FormInput
        }
      ]
    }
  },
  {
    label: "Address Selector",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Address",
          fieldName: "AddressLine",
          valueKey: "Address",
          component: FormInput
        },
        {
          label: "City",
          fieldName: "Locality",
          valueKey: "Locality",
          component: FormInput
        },
        {
          label: "Postal Code",
          fieldName: "PostalCode",
          valueKey: "PostalCode",
          component: FormInput
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
