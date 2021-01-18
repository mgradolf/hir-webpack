import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const ActivitySystemScheduleSearchMeta: IFilterField[] = [
  {
    label: "Service Name",
    inputType: TEXT,

    fieldName: "ServiceName",
    ariaLabel: "Service Name"
  },
  {
    label: "Completed",
    inputType: DROPDOWN,

    fieldName: "ActivityStatusID",
    ariaLabel: "Activity Status" 
    //,
    //TODO: populate with 2 values: Completed - CompletedOnly, Incomplete - IncompleteOnly 
    //refLookupService: getSectionRosterStatusCode,
    //displayKey: "Name",
    //valueKey: "ID"
  },
  {
    label: "Schedule",
    inputType: DATE_PICKERS,

    displayKey: "From",
    fieldName: "ScheduledTimeFrom",
    valueKey: "ScheduledTimeFrom",
    ariaLabel: "From",
    displayKey2: "To",
    fieldName2: "ScheduledTimeTo",
    valueKey2: "ScheduledTimeTo",
    ariaLabel2: "To"
  }
]
