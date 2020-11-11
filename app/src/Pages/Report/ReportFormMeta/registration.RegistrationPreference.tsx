import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SectionLookupOpenButton } from "~/Component/LookupModals/SectionLookupModal"

const meta: IFilterField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionID",
    customFilterComponent: SectionLookupOpenButton,
    extraProps: {
      isArray: true
    }
  }
]

export default meta
