import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"

const meta: IFilterField[] = [
  {
    label: "Current Date",
    fieldName: "CurrentDate",
    inputType: DATE_PICKERS
  }
]

export default meta

// CurrentDate
// InstructorParam
// searchParams = {
// "RoomNameParam",
// "RoomNumberParam",
// "BuildingNameParam",
// "BuildingNumberParam",
// "SiteNameParam",
// "OtherLocation"}
