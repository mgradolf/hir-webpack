import { DROPDOWN, IField, TEXTAREA } from "~/Component/Common/Form/common"
import { getReleaseReason } from "~/ApiServices/Service/RefLookupService"

export const StudentReleaseFormMeta: IField[] = [
  {
    label: "Reason",
    inputType: DROPDOWN,
    refLookupService: getReleaseReason,
    fieldName: "ReleaseReasonID",
    displayKey: "Name",
    valueKey: "ID",
    rules: [{ required: true, message: "Please select release reason!" }]
  },
  {
    label: "Notes",
    inputType: TEXTAREA,
    fieldName: "Note"
  }
]
