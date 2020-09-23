import { RecordType } from "~/Component/ResponsiveTable"

interface IFilterValues {
  programCode: string
  departmentID: number
  name: string
  programStatusCodeID: number
  programOfferingName: string
  programOfferingCode: string
}

const INITIAL_FILTER_VALUES: IFilterValues = {
  programCode: "*",
  departmentID: 1,
  name: "*",
  programStatusCodeID: 1,
  programOfferingName: "*",
  programOfferingCode: "*"
}

export function useSearchProgram(filterData: RecordType) {
  return {}
}
