import { Col, Row, Spin } from "antd"
import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { findQueryResult, getSearchParamList, getTableColumnList } from "~/ApiServices/BizApi/customQuery/customQueryIf"
import { IField, TEXT } from "~/Component/Common/Form/common"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export default function QueriesDetailsPage(props: RouteComponentProps<{ queryName: string }>) {
  const QueryName = props?.match?.params?.queryName
  const [searchMeta, setSearchMeta] = useState<IField[]>([])
  const [tableProps, setTableProps] = useState<ITableConfigProp>({ searchFunc: findQueryResult, columns: [] })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    Promise.all([getSearchParamList({ QueryName }), getTableColumnList({ QueryName })])
      .then((results) => {
        const _searchMeta = results[0]
        if (_searchMeta.success)
          setSearchMeta(
            _searchMeta.data.map((x: any) => {
              return { label: x.longName, fieldName: x.name, inputType: TEXT }
            })
          )

        const _tableProps = results[1]
        if (_tableProps.success)
          setTableProps({
            columns: _tableProps.data.map((x: any) => {
              return { title: x.longName, dataIndex: x.name }
            }),
            searchFunc: findQueryResult
          })
      })
      .finally(() => setLoading(false))
  }, [QueryName])
  return (
    <>
      {loading && (
        <Row justify="center" align="middle">
          <Col flex="none">
            <Spin size="large" />
          </Col>
        </Row>
      )}
      {!loading && (
        <SearchPage title={QueryName} meta={searchMeta} defaultFormValue={{ QueryName }} tableProps={tableProps} />
      )}
    </>
  )
}
