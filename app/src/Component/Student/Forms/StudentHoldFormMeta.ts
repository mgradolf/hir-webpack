import { DATE_PICKER, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getHoldType, getReason } from "~/ApiServices/Service/RefLookupService"

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
    refLookupService: getReason,
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
    inputType: TEXT,
    fieldName: "Note"
  }
]
