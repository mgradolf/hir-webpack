import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableProps, ColumnType } from "antd/lib/table"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"

export { ResponsiveTable } from "~/Component/Common/ResponsiveTable/ResponsiveTable"
export {
  renderDetailsLink,
  renderLink,
  renderDecimal,
  renderEmail,
  renderDate,
  renderDateTime,
  renderTime,
  renderAmount,
  renderBoolean,
  renderWeek,
  sortByBoolean,
  sortByString,
  sortByTime,
  sortByNumber
} from "~/Component/Common/ResponsiveTable/tableUtils"

interface CustomColumnType<RecordType> extends ColumnType<RecordType> {
  columnPosition?: number
  hidden?: boolean
}

export type TableColumnType = CustomColumnType<{ [key: string]: any }>[]

export interface IDataTableProps extends TableProps<{ [key: string]: any }> {
  columns: TableColumnType
  tableName?: string
  searchParams?: any
  searchFunc?: (Params: any, headers?: { [key: string]: any }) => Promise<IApiResponse>
  dataLoaded?: (Params: any) => void
  expandableColumnIndices?: number[]
  responsiveColumnIndices?: number[]
  expandableRowRender?: (record: any, mobileView: boolean) => JSX.Element
  breakpoints?: Breakpoint[]
  isModal?: boolean
  refreshEventName?: string
  rowKey?: string
}
