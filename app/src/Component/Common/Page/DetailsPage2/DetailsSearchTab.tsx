import { Button, Col, Row, Typography } from "antd"
import React, { useState } from "react"
import { CustomForm } from "~/Component/Common/Form"
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
  tableProps: IDataTableProps
  initialFilter?: { [key: string]: string }
  defaultFilter?: { [key: string]: string }
  helpKey?: string
}

export default function DetailsSearchTab(props: IDetailsSearchTabProp) {
  const [rowData, setRowData] = useState<Array<any>>([])
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>(
    props.initialFilter || props.defaultFilter || {}
  )
  const [help, setHelp] = useState(false)
  return (
    <>
      <Row>
        {props.title && (
          <Col span={21}>
            <Typography.Title level={3}>{props.title}</Typography.Title>
          </Col>
        )}
        {props.helpKey && (
          <Col span={3}>
            <Button type="link" onClick={() => setHelp(true)}>
              Help
            </Button>
          </Col>
        )}

        {props.helpKey && help && <HelpModal helpKey={props.helpKey} closeModal={() => setHelp(false)} />}
      </Row>

      <Row justify="end" gutter={[8, 8]}>
        {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
        {props.blockComponents && props.blockComponents.map((x, i) => <x.component {...x.props} rowData={rowData} />)}
      </Row>
      {props.searchMeta && (
        <CustomForm
          meta={props.searchMeta}
          initialFilter={searchParams}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            setSearchParams({ ...props.defaultFilter, ...newFilterValues })
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
