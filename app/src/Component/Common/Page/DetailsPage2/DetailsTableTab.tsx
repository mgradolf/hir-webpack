import React, { useState } from "react"
import { Col, Row, Typography } from "antd"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import "~/Sass/utils.scss"

export interface IBlockComponentProp {
  component: React.FunctionComponent<any>
  props: { [key: string]: any }
  rowData?: Array<any>
}

export interface IDetailsTableTabProp {
  blocks?: JSX.Element[]
  blockComponents?: IBlockComponentProp[]
  title?: string
  tableProps: IDataTableProps
}

export default function DetailsTableTab(props: IDetailsTableTabProp) {
  const [rowData, setRowData] = useState<Array<any>>([])

  return (
    <>
      <Row>
        {props.title && (
          <Col span={21}>
            <Typography.Title level={3}>{props.title}</Typography.Title>
          </Col>
        )}
      </Row>
      <Row justify="end" gutter={[8, 8]}>
        {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
        {props.blockComponents &&
          props.blockComponents.map((x, i) => (
            <Col key={i}>
              <x.component {...x.props} rowData={rowData} />{" "}
            </Col>
          ))}
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={"padding-top-10"}>
        <Col className="gutter-row" xs={24} sm={24} md={{ span: 24, offset: 0 }}>
          <ResponsiveTable
            {...props.tableProps}
            refreshEventName={props?.tableProps?.refreshEventName}
            dataLoaded={(Params: any[]) => setRowData(Params)}
          />
        </Col>
      </Row>
    </>
  )
}
