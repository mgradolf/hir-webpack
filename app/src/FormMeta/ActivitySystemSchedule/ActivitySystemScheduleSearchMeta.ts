import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const ActivitySystemScheduleSearchMeta: IFilterField[] = [
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
