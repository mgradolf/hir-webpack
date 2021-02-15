import { DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const ActivitySystemScheduleSearchMeta: IField[] = [
  {
    label: "Service Name",
    inputType: TEXT,
    fieldName: "ServiceName"
  },
  {
    label: "Completed",
    inputType: DROPDOWN,
    fieldName: "Completed",
    options: [
      { label: "Yes", value: "CompletedOnly" },
      { label: "No", value: "IncompleteOnly" }
    ]
  },
  {
    label: "Schedule",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "ScheduledTimeFrom",
    valueKey: "ScheduledTimeFrom",
    displayKey2: "To",
    fieldName2: "ScheduledTimeTo",
    valueKey2: "ScheduledTimeTo"
  }
]
