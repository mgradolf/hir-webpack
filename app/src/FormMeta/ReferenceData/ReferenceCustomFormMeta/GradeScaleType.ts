import { BOOLEAN, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"

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
    label: "Grade Type",
    fieldName: "GradeTypeID",
    inputType: DROPDOWN
  },
  {
    label: "SortPosition",
    fieldName: "SortPosition",
    inputType: NUMBER
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  },
  {
    label: "Is Editable",
    fieldName: "IsEditable",
    inputType: BOOLEAN
  }
]
