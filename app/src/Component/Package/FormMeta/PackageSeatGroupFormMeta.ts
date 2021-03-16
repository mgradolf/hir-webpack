import { CUSTOM_FIELD, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"

export const PackageSeatGroupFormMeta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "Seat Allocated",
    inputType: TEXT,
    fieldName: "AllocatedSeats",
    rules: [{ required: true, message: "Please enter allocated seats!" }]
  },
  {
    label: "Cost Units",
    inputType: NUMBER,
    fieldName: "Opportunity",
    rules: [{ required: true, message: "Please enter cost units!" }]
  },
  {
    label: "Invitation Code",
    inputType: TEXT,
    fieldName: "InvitationCode"
  }
]
