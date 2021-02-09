import { findTermFeeProductsByCategoryID } from "~/ApiServices/BizApi/query/queryIf"
import { getTermType } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DATE_PICKER, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const FormMeta: IField[] = [
  {
    label: "Name",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
  },
  {
    label: "Start Date",
    fieldName: "StartDate",
    inputType: DATE_PICKER
  },
  {
    label: "End Date",
    fieldName: "EndDate",
    inputType: DATE_PICKER
  },
  {
    label: "Term Type",
    inputType: DROPDOWN,
    fieldName: "TermTypeID",
    refLookupService: getTermType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Term Fee",
    inputType: DROPDOWN,
    fieldName: "TermTypeID",
    refLookupService: () => findTermFeeProductsByCategoryID({ ProductCategoryID: 6 }),
    displayKey: "Name",
    valueKey: "ProductID"
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  }
]
