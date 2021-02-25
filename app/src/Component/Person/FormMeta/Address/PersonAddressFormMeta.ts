import { CUSTOM_FIELD, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getAddressType } from "~/ApiServices/Service/RefLookupService"
import { SearchRegion } from "~/Component/Common/Form/CustomFormFields/SearchRegion"

export const PersonAddressFormMeta: IField[] = [
  {
    label: "Address Type",
    inputType: DROPDOWN,
    fieldName: "AddressTypeID",
    refLookupService: getAddressType,
    displayKey: "Name",
    valueKey: "ID",
    rules: [{ required: true, message: "Please select email address type!" }]
  },
  {
    label: "AddressLine 1",
    inputType: TEXT,
    fieldName: "AddressLine1"
  },
  {
    label: "AddressLine 2",
    inputType: TEXT,
    fieldName: "AddressLine2"
  },
  {
    label: "AddressLine 3",
    inputType: TEXT,
    fieldName: "AddressLine3"
  },
  {
    label: "Postal Code",
    inputType: TEXT,
    fieldName: "PostalCode"
  },
  {
    label: "State/Province",
    fieldName: "RegionCodeName",
    fieldName2: "CountryCodeName",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchRegion
  },
  {
    label: "Is Preferred",
    fieldName: "IsPreferred",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  }
]
