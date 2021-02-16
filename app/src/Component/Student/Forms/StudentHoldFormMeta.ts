import { DATE_PICKER, DROPDOWN, IField, TEXTAREA } from "~/Component/Common/Form/common"
import { getHoldType, getHoldReason } from "~/ApiServices/Service/RefLookupService"

export const StudentHoldFormMeta: IField[] = [
  {
    label: "Hold Type",
    inputType: DROPDOWN,
    refLookupService: getHoldType,
    fieldName: "HoldTypeID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Reason",
    inputType: DROPDOWN,
    refLookupService: getHoldReason,
    fieldName: "HoldReasonID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Start Date",
    inputType: DATE_PICKER,
    fieldName: "StartDate"
  },
  {
    label: "Release Date",
    inputType: DATE_PICKER,
    fieldName: "ReleaseDate"
  },
  {
    label: "Notes",
    inputType: TEXTAREA,
    fieldName: "Note"
  }
]
