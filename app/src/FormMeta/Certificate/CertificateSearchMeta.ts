import { CUSTOM_FIELD, DATE_PICKERS, IField } from "~/Component/Common/Form/common"
import { SearchOfferingLookupButton } from "~/Component/Common/Form/SearchLookups/SearchOfferingLookup"
import { SearchSectionLookupButton } from "~/Component/Common/Form/SearchLookups/SearchSectionLookup"
import { SearchProgramLookupButton } from "~/Component/Common/Form/SearchLookups/SearchProgramLookup"
import { SearchStudentLookupButton } from "~/Component/Common/Form/SearchLookups/SearchStudentLookup"

export const CourseCertificateSearchMeta: IField[] = [
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Issue Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "IssueDateFrom",
    valueKey: "IssueDateFrom",
    displayKey2: "To",
    valueKey2: "IssueDateTo",
    fieldName2: "IssueDateTo"
  },
  {
    label: "Expiration Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "ExpiryDateFrom",
    valueKey: "ExpiryDateFrom",
    displayKey2: "To",
    valueKey2: "ExpiryDateTo",
    fieldName2: "ExpiryDateTo"
  }
]

export const ProgramCertificateSearchMeta: IField[] = [
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchStudentLookupButton
  },
  {
    label: "Program",
    fieldName: "ProgramID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchProgramLookupButton
  },
  {
    label: "Issue Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "IssueDateFrom",
    valueKey: "IssueDateFrom",
    displayKey2: "To",
    valueKey2: "IssueDateTo",
    fieldName2: "IssueDateTo"
  },
  {
    label: "Expiration Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "ExpiryDateFrom",
    valueKey: "ExpiryDateFrom",
    displayKey2: "To",
    valueKey2: "ExpiryDateTo",
    fieldName2: "ExpiryDateTo"
  }
]
