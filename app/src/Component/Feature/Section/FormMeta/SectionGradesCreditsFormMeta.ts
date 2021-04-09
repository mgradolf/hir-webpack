import { getAttendanceUnit, getCreditType, getGradeScaleType } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IField, NUMBER } from "~/Component/Common/Form/common"

export const SectionGradesCreditsFormMeta: IField[] = [
  {
    label: "Grade Scale",
    inputType: DROPDOWN,
    fieldName: "GradeScaleTypeID",
    refLookupService: getGradeScaleType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Credit Type",
    inputType: DROPDOWN,
    fieldName: "CreditTypeID",
    refLookupService: getCreditType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Credit Hours",
    inputType: NUMBER,
    fieldName: "CreditHours"
  },
  {
    label: "Clock Hours",
    inputType: NUMBER,
    fieldName: "ClockHours"
  },
  {
    label: "Load Hours",
    inputType: NUMBER,
    fieldName: "LoadHours"
  },
  {
    label: "CEU Hours",
    inputType: NUMBER,
    fieldName: "CEUHours"
  },
  {
    label: "Attendance Expected",
    inputType: NUMBER,
    fieldName: "AttendanceExpected"
  },
  {
    label: "Attendance Unit",
    inputType: DROPDOWN,
    fieldName: "AttendanceUnitID",
    refLookupService: getAttendanceUnit,
    displayKey: "Name",
    valueKey: "ID"
  }
]
