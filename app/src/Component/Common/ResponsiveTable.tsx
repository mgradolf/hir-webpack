import React, { useEffect, useState } from "react"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"
import Table, { TableProps, ColumnsType } from "antd/lib/table"
import { useDeviceViews, IDeviceView } from "~/Hooks/useDeviceViews"
import { IApiResponse, RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"
import moment from "moment"
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { Button, Dropdown, Menu } from "antd"
import { DownOutlined } from "@ant-design/icons"

export type TableColumnType = ColumnsType<{ [key: string]: string }>

// TODO: Currently we have generic responsive support for
// only one set of breakpoints, we need support for multiple set of
// breakpoints
export const renderDate = (text: any) => (text !== null ? moment(text).format(DATE_FORMAT) : "")
export const renderDateTime = (text: any) => (text !== null ? moment(text).format(DATE_TIME_FORMAT) : "")
export const renderTime = (text: any) => (text !== null ? moment(text).format(TIME_FORMAT) : "")
export const renderBoolean = (text: any) => (text ? "Yes" : "No")

export interface IDataTableProps extends TableProps<{ [key: string]: string }> {
  columns: TableColumnType
  searchParams?: any
  searchFunc?: (Params: any) => Promise<IApiResponse>
  expandableColumnIndices?: number[]
  responsiveColumnIndices?: number[]
  expandableRowRender?: (record: any, mobileView: boolean) => JSX.Element
  breakpoints?: Breakpoint[]
  isModal?: boolean
  rowKey?: string
}

export function ResponsiveTable(props: IDataTableProps) {
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
  const [downloading, setDownloading] = useState(false)

  const loadDataFromSearchFunc = () => {
    if (loading) {
      return
    } else if (otherTableProps.dataSource) {
      setTableProps()
    } else if (searchParams && searchFunc) {
      setLoading(true)
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key] === "") delete searchParams[key]
      })
      searchFunc(searchParams).then((x) => {
        if (x.success && Array.isArray(x.data)) {
          const data = x.data.map((y: any, i: number) => {
            y.rowKey = i
            return y
          })
          setTableProps(data)
        }
        setTimeout(() => {
          setLoading(false)
        }, 0)
      })
    }
  }
  useEffect(() => {
    loadDataFromSearchFunc()
    // eslint-disable-next-line
  }, [otherTableProps.dataSource, searchParams])

  useEffect(() => {
    eventBus.subscribe(REFRESH_PAGE, loadDataFromSearchFunc)
    eventBus.publish(REFRESH_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_PAGE)
    }
    // eslint-disable-next-line
  }, [])

  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile || deviceViews.tab)
  })

  const expandableRowRender = (record: any, mobileView: boolean): JSX.Element => {
    const _columns: any = columns
    console.log(mobileView)
    const responsiveExpandableRowElements =
      responsiveColumnIndices && responsiveColumnIndices.length > 0 && mobileView ? (
        <>
          {responsiveColumnIndices
            .filter((index) => index <= _columns.length)
            .map((index) => {
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
        {expandableColumnIndices
          .filter((index) => index <= _columns.length)
          .map((index) => {
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
    const _conditionalProps: TableProps<{ [key: string]: string }> = {
      columns: columns
        .filter((x, i) => !expandableColumnIndices?.includes(i + 1))
        .map((col, index) =>
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
    _conditionalProps.rowSelection = otherTableProps.rowSelection
    _conditionalProps.rowKey = props.rowKey ? props.rowKey : "rowKey"
    setConditionalProps(_conditionalProps)
  }

  const downloadData = (fileType: string) => {
    const params = {
      ...(searchParams ? searchParams : {}),
      [fileType]: true
    }
    setDownloading(true)
    searchFunc &&
      searchFunc(params).then((x) => {
        setDownloading(false)
      })
  }

  return (
    <div>
      {searchFunc &&
        searchParams &&
        conditionalProps &&
        !isModal &&
        conditionalProps.dataSource &&
        conditionalProps.dataSource.length > 0 && (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Button type="link" onClick={() => downloadData(RESPONSE_TYPE.CSV)}>
                    CSV
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button type="link" onClick={() => downloadData(RESPONSE_TYPE.EXCEL)}>
                    Excel
                  </Button>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button
              loading={downloading}
              disabled={downloading}
              style={{ position: "absolute", zIndex: 100, right: "15px", top: "15px", border: "1px solid" }}
              type="link"
              onClick={(e) => e.preventDefault()}
            >
              Download <DownOutlined />
            </Button>
          </Dropdown>
        )}
      <Table {...conditionalProps} loading={otherTableProps.loading || loading} />
    </div>
  )
}
