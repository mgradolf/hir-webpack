import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"

export interface ITableConfigProp {
  expandableColumnIndices?: number[]
  responsiveColumnIndices?: number[]
  columns: TableColumnType
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
}

export interface ITableConfigPropWithDataSource {
  expandableColumnIndices?: number[]
  responsiveColumnIndices?: number[]
  columns: TableColumnType
  dataSource: any
}
