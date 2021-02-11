import { getCountries, getRegionCodes } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const FormMeta: IField[] = [
  {
    label: "Postal Code",
    fieldName: "PostalCode",
    inputType: TEXT
  },
  {
    label: "City",
    fieldName: "City",
    inputType: TEXT
  },
  {
    label: "State/Province",
    inputType: DROPDOWN,
    fieldName: "RegionCodeID",
    refLookupService: getRegionCodes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Country Code",
    inputType: DROPDOWN,
    fieldName: "CountryCodeID",
    refLookupService: getCountries,
    displayKey: "Name",
    valueKey: "ID"
  }
]
