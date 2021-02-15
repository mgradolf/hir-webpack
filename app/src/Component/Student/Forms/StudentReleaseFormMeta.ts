import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getReason } from "~/ApiServices/Service/RefLookupService"

export const StudentReleaseFormMeta: IField[] = [
  {
    label: "Reason",
    inputType: DROPDOWN,
    refLookupService: getReason,
    fieldName: "HoldReasonID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Notes",
    inputType: TEXT,
    fieldName: "Note"
  }
]
