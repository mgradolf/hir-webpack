import { getOPCStatusCode } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"

export function getSectionAcademicActivitySearchMeta(SectionID: number): IFilterField[] {
  return [
    {
      label: "",
      inputType: NUMBER,
      hidden: true,
      defaultValue: SectionID,
      fieldName: "SectionIDs",
      ariaLabel: "SectionIDs"
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
}
