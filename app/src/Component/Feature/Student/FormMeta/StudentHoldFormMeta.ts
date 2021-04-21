import { DATE_PICKER, DROPDOWN, IField, TEXTAREA } from "~/Component/Common/Form/common"
import { getHoldType, getHoldReason } from "~/ApiServices/Service/RefLookupService"

export const StudentHoldFormMeta: IField[] = [
  {
    label: "Hold Type",
    inputType: DROPDOWN,
    refLookupService: getHoldType,
    fieldName: "HoldTypeID",
    displayKey: "Name",
    valueKey: "ID",
    rules: [{ required: true, message: "Please select hold type!" }]
  },
  {
    label: "Reason",
    inputType: DROPDOWN,
    refLookupService: getHoldReason,
    fieldName: "HoldReasonID",
    displayKey: "Name",
    valueKey: "ID",
    rules: [{ required: true, message: "Please select hold reason!" }]
  },
  {
    label: "Start Date",
    inputType: DATE_PICKER,
    fieldName: "StartDate",
    rules: [{ required: true, message: "Pick the start date!" }]
  },
  {
    label: "Release Date",
    inputType: DATE_PICKER,
    fieldName: "ReleaseDate",
    rules: [{ required: true, message: "Pick the release date!" }]
  },
  {
    label: "Notes",
    inputType: TEXTAREA,
    fieldName: "Note"
  }
]
