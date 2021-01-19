import { getSectionStatusCode } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKER, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchOfferingLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchOfferingLookup"

const meta: IFilterField[] = [
  {
    label: "Offering Code",
    fieldName: "OfferingID",
    customFilterComponent: SearchOfferingLookupButton
  },
  {
    label: "Section Status",
    inputType: DROPDOWN,
    fieldName: "SectionStatusCodeID",
    refLookupService: getSectionStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Creation Date",
    fieldName: "creationDate",
    inputType: DATE_PICKER
  },
  {
    label: "Termination Date",
    inputType: DATE_PICKER,
    fieldName: "creationDate"
  }
]

export default meta
