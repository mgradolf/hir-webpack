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
    label: "SortPosition",
    fieldName: "SortPosition",
    inputType: NUMBER
  },
  {
    label: "Start Date Flag",
    fieldName: "StartDateFlag",
    inputType: DROPDOWN,
    options: [
      { label: "Disabled", value: 1 },
      { label: "Optional", value: 2 },
      { label: "Mandatory", value: 3 }
    ]
  },
  {
    label: "Release Date Flag",
    fieldName: "ReleaseDateFlag",
    inputType: DROPDOWN,
    options: [
      { label: "Disabled", value: 1 },
      { label: "Optional", value: 2 },
      { label: "Mandatory", value: 3 }
    ]
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  }
]
