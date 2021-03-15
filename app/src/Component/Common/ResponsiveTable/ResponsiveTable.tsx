import React, { useEffect, useState } from "react"
import Table, { TableProps } from "antd/lib/table"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { useDeviceViews, IDeviceView } from "~/Hooks/useDeviceViews"
import { RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_MODAl, REFRESH_PAGE } from "~/utils/EventBus"
import { Button, Dropdown, Menu } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import {
  renderBoolean,
  sortByBoolean,
  sortByNumber,
  sortByString,
  sortByTime
} from "~/Component/Common/ResponsiveTable/tableUtils"
import { IDataTableProps, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { processTableMetaWithUserMetaConfig } from "./TableMetaShadowingProcessor"

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
  const firstRender = useFirstRender()

  const loadDataFromSearchFunc = async () => {
    const columnsConfigByUser = await processTableMetaWithUserMetaConfig(columns, props.tableName)
    if (loading) {
      return
    } else if (otherTableProps.dataSource) {
      setTableProps(columnsConfigByUser)
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
          setTableProps(columnsConfigByUser, data)
          dataLoaded && dataLoaded(data)
        }
        setTimeout(() => {
          setLoading(false)
        }, 0)
      })
    }
  }
  useEffect(() => {
    if (!firstRender) loadDataFromSearchFunc()
    // eslint-disable-next-line
  }, [otherTableProps.dataSource, searchParams])

  useEffect(() => {
    const eventName = isModal ? REFRESH_MODAl : props.refreshEventName ? props.refreshEventName : REFRESH_PAGE
    eventBus.subscribe(eventName, loadDataFromSearchFunc)
    eventBus.publish(eventName)
    return () => {
      eventBus.unsubscribe(eventName)
    }

    // eslint-disable-next-line
  }, [])

  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  const expandableRowRender = (record: any, mobileView: boolean): JSX.Element => {
    const _columns: any = columns
    const expandableRowElements = expandableColumnIndices ? (
      <>
        {expandableColumnIndices
          .filter((index) => index <= _columns.length)
          .map((index, i) => {
            const _index = index - 1
            const title = _columns[_index].title
            const text = record[_columns[_index].dataIndex]
            return (
              <React.Fragment key={i}>
                {title && text && (
                  <li>
                    <span>{title} : </span>
                    <span>
                      {" "}
                      {_columns[_index] && _columns[_index].render ? _columns[_index].render(text, record) : text}
                    </span>
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
              const _index = index - 1
              const title = _columns[_index].title
              let text: any = record[_columns[_index].dataIndex]
              if (Array.isArray(text)) text = text.toString()
              else if (typeof text === "boolean") text = renderBoolean(text)
              return (
                <React.Fragment key={i}>
                  {title && text && (
                    <li>
                      <span>{title} : </span>
                      <span>
                        {" "}
                        {_columns[_index] && _columns[_index].render ? _columns[_index].render(text, record) : text}
                      </span>
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
  const setTableProps = (columnsConfigByUser: TableColumnType, data?: any) => {
    const _conditionalProps: TableProps<{ [key: string]: string }> = {
      columns: columnsConfigByUser
        .filter((x, i) => {
          const include = !expandableColumnIndices?.includes(i + 1)
          return include
        })
        .filter((x, i) => {
          return !(mobileView && responsiveColumnIndices?.includes(i + 1))
        })
        .map((x, i) => {
          x.sorter = (a: any, b: any) => {
            if (typeof a.dataIndex === "boolean") {
              return sortByBoolean(a, b)
            } else if (typeof a.dataIndex === "number") {
              return sortByNumber(a, b)
            } else if (new Date(a.dataIndex).toString() !== "Invalid Date") {
              return sortByTime(a, b)
            } else if (typeof a.dataIndex === "string") {
              return sortByString(a, b)
            } else return -1
          }
          return x
        }),
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
      _conditionalProps.expandedRowRender = (record: any) => {
        return expandableRowRender(record, mobileView)
      }
    }
    _conditionalProps.scroll = { x: columns.length }
    _conditionalProps.rowSelection = otherTableProps.rowSelection
    _conditionalProps.rowKey = props.rowKey ? props.rowKey : "rowKey"
    _conditionalProps.pagination =
      typeof props.pagination === "boolean" && !props.pagination
        ? props.pagination
        : _conditionalProps.dataSource && _conditionalProps.dataSource?.length > 0
        ? { position: ["topLeft"], pageSize: 20, simple: true }
        : false
    setConditionalProps(_conditionalProps)
  }

  const downloadData = (fileType: string) => {
    let header = {}
    switch (fileType) {
      case RESPONSE_TYPE.EXCEL:
        header = { ResponseType: "application/vnd.ms-excel" }
        break
      case RESPONSE_TYPE.CSV:
        header = { ResponseType: "text/csv" }
        break
    }

    setDownloading(true)
    console.log("header in responsive table ", header)
    searchFunc &&
      searchFunc(searchParams, header).then((x) => {
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
              style={{ position: "absolute", zIndex: 100, right: "25px", top: "15px", border: "1px solid" }}
              type="default"
              // style={{ float: "right", right: "15px", top: "15px", border: "1px solid" }}
              // type="link"
              onClick={(e) => e.preventDefault()}
              icon={<DownloadOutlined />}
            />
          </Dropdown>
        )}
      <Table {...conditionalProps} loading={otherTableProps.loading || loading} />
    </div>
  )
}
