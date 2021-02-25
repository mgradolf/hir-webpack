import { findPickList } from "~/ApiServices/BizApi/query/queryIf"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const PersonBasicFormMeta: IField[] = [
  {
    label: "Prefix",
    inputType: DROPDOWN,
    fieldName: "Prefix",
    refLookupService: () => findPickList({ PickListName: "PersonPrefix" })
  },
  {
    label: "Middle Name",
    inputType: TEXT,
    fieldName: "MiddleName"
  },
  {
    label: "First Name",
    inputType: TEXT,
    fieldName: "FirstName"
  },
  {
    label: "Maiden Name",
    inputType: TEXT,
    fieldName: "MaidenName"
  },
  {
    label: "Last Name",
    inputType: TEXT,
    fieldName: "LastName"
  },
  {
    label: "Other Name",
    inputType: TEXT,
    fieldName: "OtherName"
  },
  {
    label: "Suffix",
    inputType: DROPDOWN,
    fieldName: "Suffix",
    refLookupService: () => findPickList({ PickListName: "PersonSuffix" })
  }
]
