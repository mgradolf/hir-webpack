import { IField, TEXT } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"
import { generateMMDDYY } from "~/utils/MMDDYYGenerator"

const meta: IField[] = [
  {
    label: "Instructor Name",
    inputType: TEXT,
    fieldName: "InstructorParam"
  },
  {
    label: "Location",
    inputType: TEXT,
    fieldName: "RoomNameParam"
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    RoomNameParam: ["RoomNumberParam", "BuildingNameParam", "BuildingNumberParam", "SiteNameParam", "OtherLocation"]
  },
  defaultFormValue: {
    CurrentDate: generateMMDDYY(new Date())
  },
  atLeastOneRequiredfield: true
}

export default reportMeta
