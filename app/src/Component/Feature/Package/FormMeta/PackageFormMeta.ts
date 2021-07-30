import { DATE_PICKER, IField, NUMBER, TEXT, TEXTAREA } from "~/Component/Common/Form/common"

export const PackageFormMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "Name",
    maxLength: 128,
    rules: [{ required: true, message: "Please enter package name!" }]
  },
  {
    label: "Description",
    inputType: TEXTAREA,
    fieldName: "Description",
    maxLength: 4000,
    rules: [{ required: true, message: "Please enter description!" }]
  },
  {
    label: "Start Date",
    inputType: DATE_PICKER,
    fieldName: "StartDate",
    rules: [{ required: true, message: "Please pick start date!" }]
  },
  {
    label: "End Date",
    inputType: DATE_PICKER,
    fieldName: "EndDate",
    rules: [{ required: true, message: "Please pick end date!" }]
  },
  {
    label: "PO Number",
    inputType: NUMBER,
    maxLength: 20,
    fieldName: "PONumber"
  },
  {
    label: "PO Date",
    inputType: DATE_PICKER,
    fieldName: "PODate"
  },
  {
    label: "Credit Units",
    inputType: NUMBER,
    fieldName: "AllowedCredit",
    rules: [{ required: true, message: "Please enter credit units!" }]
  }
]
