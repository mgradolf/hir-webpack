import React, { useEffect, useState } from "react"
import Table, { TableProps } from "antd/lib/table"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { useDeviceViews, IDeviceView } from "~/Hooks/useDeviceViews"
import { eventBus, REFRESH_MODAl, REFRESH_PAGE } from "~/utils/EventBus"
import { Col, Pagination, Row } from "antd"
import { sortByBoolean, sortByNumber, sortByString, sortByTime } from "~/Component/Common/ResponsiveTable/tableUtils"
import { IDataTableProps, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { processTableMetaWithUserMetaConfig } from "~/Component/Common/ResponsiveTable/TableMetaShadowingProcessor"
import { ExpandableRowRender } from "~/Component/Common/ResponsiveTable/ExpandableRowRender"
import { DownloadButton } from "~/Component/Common/ResponsiveTable/DownloadButton"

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
  const [paginatedData, setPaginatedData] = useState<any[]>([])
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
            if (!otherTableProps.rowKey) y.rowKey = i
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
    if (props.searchFunc) {
      const eventName = isModal ? REFRESH_MODAl : props.refreshEventName ? props.refreshEventName : REFRESH_PAGE
      eventBus.subscribe(eventName, loadDataFromSearchFunc)
      eventBus.publish(eventName)
      return () => {
        eventBus.unsubscribe(eventName)
      }
    } else {
      loadDataFromSearchFunc()
    }
    // eslint-disable-next-line
  }, [])

  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

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
          if (x.title === "" || !x.title) return x
          x.sorter = (a: any, b: any) => {
            if (typeof a.dataIndex === "boolean") {
              return sortByBoolean(a, b)
            } else if (typeof a.dataIndex === "number") {
              return sortByNumber(a, b)
            } else if (!isNaN(Date.parse(a.dataIndex))) {
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
    if (Array.isArray(_conditionalProps.dataSource)) {
      setPaginatedData(_conditionalProps.dataSource?.filter((x, i) => i < 20))
    }

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
        return (
          <ExpandableRowRender
            columns={columns}
            expandableColumnIndices={expandableColumnIndices}
            responsiveColumnIndices={responsiveColumnIndices}
            record={record}
            mobileView={mobileView}
          />
        )
      }
    }
    _conditionalProps.scroll = { x: columns.length }
    _conditionalProps.rowSelection = otherTableProps.rowSelection
    _conditionalProps.rowKey = props.rowKey ? props.rowKey : "rowKey"
    setConditionalProps(_conditionalProps)
  }

  const paginationChange = (page: number, pageSize = 20) => {
    console.log("pagination ", page, pageSize)
    if (conditionalProps && Array.isArray(conditionalProps.dataSource)) {
      const __dataSource = conditionalProps.dataSource.slice(
        page === 1 ? 0 : page * pageSize - pageSize,
        page * pageSize
      )
      setPaginatedData(__dataSource)
    }
  }

  return (
    <Row style={{ backgroundColor: "#fafafa", ...props.style }}>
      {conditionalProps && conditionalProps.dataSource && (
        <Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "10px",
            paddingRight: "10px",
            paddingBottom: "10px"
          }}
        >
          <Pagination
            simple
            onChange={paginationChange}
            defaultPageSize={20}
            total={conditionalProps.dataSource.length}
            pageSizeOptions={["5", "10", "15", "20", "25", "30", "50"]}
          />
          <div>{`Total ${conditionalProps.dataSource.length} rows`}</div>
        </Col>
      )}
      <Col span={12}>
        <Row justify="end">
          {searchFunc &&
            searchParams &&
            !isModal &&
            conditionalProps &&
            conditionalProps.dataSource &&
            conditionalProps.dataSource.length > 0 && (
              <DownloadButton
                searchFunc={searchFunc}
                searchParams={searchParams}
                downloading={downloading}
                setDownloading={setDownloading}
              />
            )}
        </Row>
      </Col>
      <Col span={24}>
        <Table
          {...conditionalProps}
          dataSource={paginatedData}
          bordered={true}
          pagination={false}
          loading={otherTableProps.loading || loading}
        />
      </Col>
    </Row>
  )
}
