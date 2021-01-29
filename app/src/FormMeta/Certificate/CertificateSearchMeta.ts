import { CUSTOM_FIELD, DATE_PICKERS, IField } from "~/Component/Common/Form/common"
import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { ProgramLookup } from "~/Component/Common/Form/FormLookupFields/ProgramLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"

export const CourseCertificateSearchMeta: IField[] = [
  {
    label: "Student",
    fieldName: "StudentID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: StudentLookup
  },
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: OfferingLookupButton
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
    customFilterComponent: StudentLookup
  },
  {
    label: "Program",
    fieldName: "ProgramID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: ProgramLookup
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
