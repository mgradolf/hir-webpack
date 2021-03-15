import { Col, Row, Typography } from "antd"
import React, { useState } from "react"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import { IField } from "~/Component/Common/Form/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { HelpModal } from "~/Component/Common/Modal/HelpModal"

export interface IBlockComponentProp {
  component: React.FunctionComponent<any>
  props: { [key: string]: any }
  rowData?: Array<any>
}

export interface IDetailsSearchTabProp {
  blocks?: JSX.Element[]
  blockComponents?: IBlockComponentProp[]
  title?: string
  searchMeta?: IField[]
  searchMetaName?: string
  tableProps: IDataTableProps
  initialFormValue?: { [key: string]: string }
  defaultFormValue?: { [key: string]: string }
  helpUrl?: string
}

export default function DetailsSearchTab(props: IDetailsSearchTabProp) {
  const [rowData, setRowData] = useState<Array<any>>([])
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>(
    props.initialFormValue || props.defaultFormValue || {}
  )
  return (
    <>
      <Row>
        {props.title && (
          <Col span={21}>
            <Typography.Title level={3}>{props.title}</Typography.Title>
          </Col>
        )}
        {props.helpUrl && (
          <Col span={3}>
            <HelpModal helpUrl={props.helpUrl} />
          </Col>
        )}
      </Row>

      <Row justify="end" gutter={[8, 8]}>
        {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
        {props.blockComponents && props.blockComponents.map((x, i) => <x.component {...x.props} rowData={rowData} />)}
      </Row>
      {props.searchMeta && (
        <MetaDrivenForm
          meta={props.searchMeta}
          metaName={props.searchMetaName}
          initialFormValue={searchParams}
          helpUrl={props.helpUrl}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            setSearchParams({ ...props.defaultFormValue, ...newFilterValues })
            console.log(newFilterValues)
          }}
        />
      )}
      <Row>
        <Col span={24}>
          <ResponsiveTable
            {...props.tableProps}
            searchParams={{ ...searchParams, ...props?.tableProps?.searchParams }}
            refreshEventName={props?.tableProps?.refreshEventName || "REFRESH_" + Date.now().toString()}
            dataLoaded={(Params: any[]) => setRowData(Params)}
          />
        </Col>
      </Row>
    </>
  )
}
