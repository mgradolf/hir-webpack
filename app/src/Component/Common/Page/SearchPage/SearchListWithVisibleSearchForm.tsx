import React, { useState } from "react"
import { Col, Row, Typography } from "antd"
import SearchFilters from "~/Component/Common/SearchFilters"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import ResponsiveTable, { IDataTableProps } from "~/Component/Common/ResponsiveTable"

export interface ISearchListWithVisibleSearchFormProp {
  title: string
  blocks: JSX.Element[]
  meta: IFilterField[]
  tableProps: IDataTableProps
}

export default function SearchListWithVisibleSearchForm(props: ISearchListWithVisibleSearchFormProp) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()

  return (
    <div className="site-layout-content">
      <Row>
        <Typography.Title level={3}>{props.title}</Typography.Title>
      </Row>
      <SearchFilters
        title={""}
        isModalView={true}
        isCheckeble={false}
        visible={true}
        meta={props.meta}
        initialFilter={{}}
        onApplyChanges={(newFilterValues, appliedFilterCount) => {
          setSearchParams(newFilterValues)
        }}
      />
      <Row justify="end" gutter={[8, 8]}>
        {props.blocks.map((x) => (
          <Col>{x}</Col>
        ))}
      </Row>
      <ResponsiveTable {...props.tableProps} searchParams={searchParams} />
    </div>
  )
}
