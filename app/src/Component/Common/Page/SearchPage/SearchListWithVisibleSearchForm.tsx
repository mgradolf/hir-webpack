import React, { useState } from "react"
import { Col, Row, Typography } from "antd"
import SearchFilters from "~/Component/Common/SearchFilters"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"

export interface ISearchListWithVisibleSearchFormProp {
  title: string
  blocks?: JSX.Element[]
  meta?: IFilterField[]
  tableProps: IDataTableProps
  initialFilter?: { [key: string]: string }
}

export default function SearchListWithVisibleSearchForm(props: ISearchListWithVisibleSearchFormProp) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()

  return (
    <div className="site-layout-content">
      <Row>
        <Typography.Title level={3}>{props.title}</Typography.Title>
      </Row>
      {props.meta && (
        <SearchFilters
          title={""}
          isModalView={true}
          isCheckeble={false}
          visible={true}
          meta={props.meta}
          initialFilter={props.initialFilter || {}}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            setSearchParams(newFilterValues)
            console.log(newFilterValues)
          }}
        />
      )}
      <Row justify="end" gutter={[8, 8]}>
        {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
      </Row>
      <ResponsiveTable {...props.tableProps} searchParams={searchParams} />
    </div>
  )
}
