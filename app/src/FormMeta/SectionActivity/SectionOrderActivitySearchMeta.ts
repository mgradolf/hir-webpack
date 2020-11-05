import { getOPCStatusCode } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { SectionLookupOpenButton } from "~/Component/LookupModals/SectionLookupModal"

export const getSectionAcademicActivitySearchMeta: IFilterField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionIDs",
    customFilterComponent: SectionLookupOpenButton,
    extraProps: {
      isArray: true
    }
  },
  {
    label: "User ID",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "UserID",
    ariaLabel: "User ID"
  },
  {
    label: "Order Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrderStatusID",
    ariaLabel: "Order Status",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Order Activity",
    inputType: DATE_PICKERS,
    defaultValue: "",
    displayKey: "From",
    fieldName: "FromDate",
    valueKey: "FromDate",
    ariaLabel: "From",
    displayKey2: "To",
    fieldName2: "ToDate",
    valueKey2: "ToDate",
    ariaLabel2: "To"
  }
]
