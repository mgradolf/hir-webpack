import React, { useState } from "react"
import { Button, Col, Row, Typography } from "antd"
import SearchFilters from "~/Component/Common/SearchFilters"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { HelpModal } from "~/Component/Common/Modal/HelpModal"
export interface ISearchListWithVisibleSearchFormProp {
  title: string
  blocks?: JSX.Element[]
  meta?: IFilterField[]
  tableProps: IDataTableProps
  initialFilter?: { [key: string]: string }
  defaultFilter?: { [key: string]: string }
  helpKey?: string
  updatedParams?: (params?: any) => void
}

export default function SearchListWithVisibleSearchForm(props: ISearchListWithVisibleSearchFormProp) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()
  const [help, setHelp] = useState(false)

  return (
    <div className="site-layout-content">
      <Row>
        <Col span={21}>
          <Typography.Title level={3}>{props.title}</Typography.Title>
        </Col>
        {props.helpKey && (
          <Col span={3}>
            <Button type="link" onClick={() => setHelp(true)}>
              Help
            </Button>
          </Col>
        )}
        {props.helpKey && help && <HelpModal helpKey={props.helpKey} closeModal={() => setHelp(false)} />}
      </Row>
      {props.meta && (
        <SearchFilters
          title={""}
          isModalView={true}
          isCheckeble={false}
          visible={true}
          meta={props.meta}
          initialFilter={{ ...props.initialFilter, ...props.defaultFilter } || {}}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            setSearchParams({ ...props.defaultFilter, ...newFilterValues })
            props.updatedParams && props.updatedParams({ ...props.defaultFilter, ...newFilterValues })
          }}
        />
      )}
      <Row justify="end" gutter={[8, 8]}>
        {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
      </Row>
      <Row>
        <Col span={24}>
          <ResponsiveTable {...props.tableProps} searchParams={searchParams} />
        </Col>
      </Row>
    </div>
  )
}
