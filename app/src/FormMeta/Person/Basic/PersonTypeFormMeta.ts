import {
  getMaritalStatusType,
  getGenderTypes,
  getReligionType,
  getCitizenshipType
} from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKER, DROPDOWN, IField } from "~/Component/Common/Form/common"

export const PersonTypeFormMeta: IField[] = [
  {
    label: "Birth Date",
    inputType: DATE_PICKER,
    fieldName: "Birthday"
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
    label: "Marital Status",
    inputType: DROPDOWN,
    fieldName: "MaritalStatusTypeID",
    refLookupService: getMaritalStatusType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Citizenship",
    inputType: DROPDOWN,
    fieldName: "CitizenshipTypeID",
    refLookupService: getCitizenshipType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Region",
    inputType: DROPDOWN,
    fieldName: "ReligionTypeID",
    refLookupService: getReligionType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Deceased",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ],
    fieldName: "IsDeceased"
  }
]
