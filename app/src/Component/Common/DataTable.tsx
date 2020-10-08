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
  responsiveExpandableColumnIndices?: number[]
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
    responsiveExpandableColumnIndices,
    breakpoints,
    isModal,
    ...otherTableProps
  } = props

  const [loading, setLoading] = useState(false)
  const [mobileView, setMobileView] = useState(false)

  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  const expandableRowRender = (record: any, mobileView: boolean): JSX.Element => {
    console.log(record)
    console.log(mobileView)
    const _columns: any = columns

    const responsiveExpandableRowElements =
      responsiveExpandableColumnIndices && mobileView ? (
        <>
          {responsiveExpandableColumnIndices.map((index) => {
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
  const setTableProps = (data: any) => {
    const _conditionalProps: { [key: string]: any } = {
      columns: columns.map((col, index) =>
        responsiveExpandableColumnIndices && responsiveExpandableColumnIndices.includes(index)
          ? { ...col, responsive: ["md", "lg", "xl", "xxl"] }
          : col
      ),
      ...otherTableProps
    }

    if (!otherTableProps.dataSource) {
      _conditionalProps.dataSource = data
      _conditionalProps.loading = loading
    }

    if (otherTableProps.expandableRowRender) {
      _conditionalProps.expandedRowRender = (record: any) =>
        _conditionalProps.expandableRowRender && _conditionalProps.expandableRowRender(record, mobileView)
    } else if (
      !!(
        (expandableColumnIndices && expandableColumnIndices?.length > 0) ||
        (responsiveExpandableColumnIndices && responsiveExpandableColumnIndices?.length > 0)
      )
    ) {
      _conditionalProps.expandedRowRender = (record: any) => expandableRowRender(record, mobileView)
    }
    _conditionalProps.scroll = { y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 600, x: 300 }

    setConditionalProps(_conditionalProps)
  }

  useEffect(() => {
    if (searchParams && searchFunc) {
      setLoading(true)
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key] === "") delete searchParams[key]
      })
      searchFunc(searchParams).then((x) => {
        if (x.success) {
          setTableProps(x.data)
        }
        setLoading(false)
      })
    }
    // eslint-disable-next-line
  }, [searchParams, searchFunc, expandableColumnIndices, responsiveExpandableColumnIndices, mobileView])

  return <Table {...conditionalProps} loading={loading} />
}
