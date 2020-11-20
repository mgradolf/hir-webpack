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

export type TableColumnType = ColumnsType<{ [key: string]: any }>

// TODO: Currently we have generic responsive support for
// only one set of breakpoints, we need support for multiple set of
// breakpoints
export const renderDate = (text: any) => (text !== null ? moment(text).format(DATE_FORMAT) : "")
export const renderDateTime = (text: any) => (text !== null ? moment(text).format(DATE_TIME_FORMAT) : "")
export const renderTime = (text: any) => (text !== null ? moment(text).format(TIME_FORMAT) : "")
export const renderBoolean = (text: any) => (text ? "Yes" : "No")
export const renderWeek = (text: any[], record: any) => {
  const weeks: string[] = ["Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  return text && Array.isArray(text) && weeks.filter((x, i) => text.includes(i + 1))
}

export interface IDataTableProps extends TableProps<{ [key: string]: any }> {
  columns: TableColumnType
  searchParams?: any
  searchFunc?: (Params: any) => Promise<IApiResponse>
  dataLoaded?: (Params: any) => void
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
    dataLoaded,
    expandableColumnIndices,
    responsiveColumnIndices,
    breakpoints,
    isModal,
    ...otherTableProps
  } = props

  const [loading, setLoading] = useState(false)
  const [mobileView, setMobileView] = useState<boolean>(false)
  const [downloading, setDownloading] = useState(false)

  const loadDataFromSearchFunc = () => {
    if (loading) {
      return
    } else if (otherTableProps.dataSource) {
      setTableProps()
    } else if (searchParams && searchFunc) {
      setLoading(true)
      typeof searchParams === "object" &&
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
          dataLoaded && dataLoaded(data)
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
    const expandableRowElements = expandableColumnIndices ? (
      <>
        {expandableColumnIndices
          .filter((index) => index <= _columns.length)
          .map((index, i) => {
            const title = _columns[index - 1].title
            const text = record[_columns[index - 1].dataIndex]
            return (
              <React.Fragment key={i}>
                {title && text && (
                  <li>
                    <span>{title} : </span>
                    <span> {_columns[index] && _columns[index].render ? _columns[index].render(text) : text}</span>
                  </li>
                )}
              </React.Fragment>
            )
          })}
      </>
    ) : null
    const responsiveExpandableRowElements =
      responsiveColumnIndices && responsiveColumnIndices.length > 0 && mobileView ? (
        <>
          {responsiveColumnIndices
            .filter((index) => {
              return !expandableColumnIndices?.includes(index) || index <= _columns.length
            })
            .map((index, i) => {
              const title = _columns[index - 1].title
              let text: any = record[_columns[index - 1].dataIndex]
              if (Array.isArray(text)) text = text.toString()
              else if (typeof text === "boolean") text = renderBoolean(text)
              return (
                <React.Fragment key={i}>
                  {title && text && (
                    <li>
                      <span>{title} : </span>
                      <span> {_columns[index] && _columns[index].render ? _columns[index].render(text) : text}</span>
                    </li>
                  )}
                </React.Fragment>
              )
            })}
        </>
      ) : null

    return (
      <ul>
        {expandableRowElements}
        {responsiveExpandableRowElements}
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
    _conditionalProps.scroll = { x: columns.length * 80 }
    _conditionalProps.rowSelection = otherTableProps.rowSelection
    _conditionalProps.rowKey = props.rowKey ? props.rowKey : "rowKey"
    _conditionalProps.pagination =
      props.pagination && typeof props.pagination === "boolean" && !props.pagination
        ? props.pagination
        : { position: ["topLeft"], pageSize: 20 }
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
