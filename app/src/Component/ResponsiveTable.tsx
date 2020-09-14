import React, { useState } from "react"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"
import Table, { TableProps, ColumnsType } from "antd/lib/table"
import { useDeviceViews, IDeviceView } from "~/Hooks/useDeviceViews"

export type RecordType = { [key: string]: string }

// TODO: Currently we have generic responsive support for
// only one set of breakpoints, we need support for multiple set of
// breakpoints

interface IResponsiveTableProps extends TableProps<RecordType> {
  columns: ColumnsType<RecordType>
  expandableRowRender?: (record: any, mobileView: boolean) => JSX.Element
  breakpoints?: Breakpoint[]
  responsiveColumnIndices?: number[]
}

export default function ResponsiveTable(props: IResponsiveTableProps) {
  const { breakpoints, columns, responsiveColumnIndices, ...otherTableProps } = props
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })
  function processResponsiveColumns(): ColumnsType<RecordType> {
    return columns.map((col, index) =>
      responsiveColumnIndices && responsiveColumnIndices.includes(index) ? { ...col, responsive: breakpoints } : col
    )
  }

  const responsiveColumns = processResponsiveColumns()

  return (
    <Table
      columns={responsiveColumns}
      expandedRowRender={(record) => props.expandableRowRender && props.expandableRowRender(record, mobileView)}
      {...otherTableProps}
    />
  )
}
