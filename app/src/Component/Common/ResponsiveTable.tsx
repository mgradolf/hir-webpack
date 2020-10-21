import React, { useEffect, useState } from "react"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"
import Table, { TableProps, ColumnsType } from "antd/lib/table"
import { useDeviceViews, IDeviceView } from "~/Hooks/useDeviceViews"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export type RecordType = { [key: string]: string }

// TODO: Currently we have generic responsive support for
// only one set of breakpoints, we need support for multiple set of
// breakpoints

interface IDataTableProps extends TableProps<RecordType> {
  columns: ColumnsType<RecordType>
  searchParams?: any
  searchFunc?: (Params: any) => Promise<IApiResponse>
  expandableColumnIndices?: number[]
  responsiveColumnIndices?: number[]
  expandableRowRender?: (record: any, mobileView: boolean) => JSX.Element
  breakpoints?: Breakpoint[]
  isModal?: boolean
  rowKey?: string
}

export default function DataTable(props: IDataTableProps) {
  const {
    columns,
    searchParams,
    searchFunc,
    expandableColumnIndices,
    responsiveColumnIndices,
    breakpoints,
    isModal,
    ...otherTableProps
  } = props

  const [loading, setLoading] = useState(false)
  const [mobileView, setMobileView] = useState<any>(undefined)

  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile || deviceViews.tab)
  })

  const expandableRowRender = (record: any, mobileView: boolean): JSX.Element => {
    const _columns: any = columns

    const responsiveExpandableRowElements =
      responsiveColumnIndices && responsiveColumnIndices.length > 0 && mobileView ? (
        <>
          {responsiveColumnIndices.map((index) => {
            const title = _columns[index - 1].title
            const text = record[_columns[index - 1].dataIndex]
            return (
              <li key={index}>
                <span>{title} : </span>
                <span> {text}</span>
              </li>
            )
          })}
        </>
      ) : null

    const expandableRowElements = expandableColumnIndices ? (
      <>
        {expandableColumnIndices.map((index) => {
          const title = _columns[index - 1].title
          const text = record[_columns[index - 1].dataIndex]
          return (
            <li key={index}>
              <span>{title} : </span>
              <span> {text}</span>
            </li>
          )
        })}
      </>
    ) : null
    return (
      <ul>
        {responsiveExpandableRowElements}
        {expandableRowElements}
      </ul>
    )
  }

  const [conditionalProps, setConditionalProps] = useState<{ [key: string]: any }>({})
  const setTableProps = (data?: any) => {
    const _conditionalProps: TableProps<RecordType> = {
      columns: columns.map((col, index) =>
        responsiveColumnIndices && responsiveColumnIndices.includes(index)
          ? { ...col, responsive: ["md", "lg", "xl", "xxl"] }
          : col
      ),
      ...otherTableProps
    }

    _conditionalProps.dataSource = otherTableProps.dataSource ? otherTableProps.dataSource : data

    if (otherTableProps.expandableRowRender) {
      _conditionalProps.expandedRowRender = (record: any) =>
        otherTableProps.expandableRowRender && otherTableProps.expandableRowRender(record, mobileView)
    } else if (
      !!(
        (expandableColumnIndices && expandableColumnIndices?.length > 0) ||
        (responsiveColumnIndices && responsiveColumnIndices?.length > 0)
      )
    ) {
      _conditionalProps.expandedRowRender = (record: any) => expandableRowRender(record, mobileView)
    }
    _conditionalProps.scroll = { ...(props.isModal && { y: Math.floor(window.innerHeight * 0.45) }), x: 300 }
    _conditionalProps.pagination = { position: ["topLeft"], pageSize: 20 }
    _conditionalProps.rowSelection = otherTableProps.rowSelection
    _conditionalProps.rowKey = props.rowKey ? props.rowKey : "rowKey"

    setConditionalProps(_conditionalProps)
  }

  useEffect(() => {
    if (mobileView === undefined) {
    } else if (otherTableProps.dataSource) {
      setTableProps()
    } else if (searchParams && searchFunc) {
      setLoading(true)
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key] === "") delete searchParams[key]
      })
      searchFunc(searchParams).then((x) => {
        if (x.success) {
          const data = x.data.map((y: any, i: number) => {
            y.rowkey = props.rowKey + " " + i
            return y
          })
          setTableProps(data)
          console.log("asdsd ", data)
        }
        setTimeout(() => {
          setLoading(false)
        }, 0)
      })
    }
    // eslint-disable-next-line
  }, [otherTableProps.dataSource, searchParams, mobileView])

  return <Table {...conditionalProps} loading={otherTableProps.loading || loading} />
}
