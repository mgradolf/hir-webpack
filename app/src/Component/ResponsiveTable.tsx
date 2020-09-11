import React from "react"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"
import Table, { TableProps, ColumnsType } from "antd/lib/table"
import { Grid } from "antd"

export type RecordType = { [key: string]: string }

interface IResponsiveTableProps extends TableProps<RecordType> {
  columns: ColumnsType<RecordType>
  expandableRowRender?: (record: any, display: boolean) => JSX.Element
  breakpoints?: Breakpoint[]
  responsiveColumnIndices?: number[]
}

export default function ResponsiveTable(props: IResponsiveTableProps) {
  const { breakpoints, columns, responsiveColumnIndices, ...otherTableProps } = props
  const { useBreakpoint } = Grid
  const screens = useBreakpoint() as { [key: string]: boolean } // {xs: false, sm: true, md: false, lg: false, xl: false, …}
  const display = !!(breakpoints && breakpoints.filter((x) => screens[x]).length === 0)

  function processResponsiveColumns(): ColumnsType<RecordType> {
    return columns.map((col, index) =>
      responsiveColumnIndices && responsiveColumnIndices.includes(index) ? { ...col, responsive: breakpoints } : col
    )
  }

  const responsiveColumns = processResponsiveColumns()

  return (
    <Table
      columns={responsiveColumns}
      expandedRowRender={(record) => props.expandableRowRender && props.expandableRowRender(record, display)}
      {...otherTableProps}
    />
  )
}
