import React, { useEffect, useState } from "react"
import { Col, Row, Typography } from "antd"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import { IField } from "~/Component/Common/Form/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { QuestionCircleFilled } from "@ant-design/icons"
export interface ISearchListWithVisibleSearchFormProp {
  title: string
  blocks?: JSX.Element[]
  meta?: IField[]
  metaName?: string
  tableProps: IDataTableProps
  initialFormValue?: { [key: string]: string }
  defaultFormValue?: { [key: string]: string }
  helpUrl?: string
  stopProducingQueryParams?: boolean
  updatedParams?: (params?: any) => void
}

export default function SearchListWithVisibleSearchForm(props: ISearchListWithVisibleSearchFormProp) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()

  useEffect(() => {
    if (props.initialFormValue) setSearchParams(props.initialFormValue)
    // eslint-disable-next-line
  }, [])
  return (
    <div className="site-layout-content">
      {props.meta && (
        <MetaDrivenForm
          title={
            <Row>
              <Col xs={24} sm={12}>
                <Typography.Title level={3}>{props.title}</Typography.Title>
              </Col>
              <Col
                xs={24}
                sm={12}
                style={{
                  color: "#1990ff",
                  fontSize: "20px",
                  paddingTop: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px"
                }}
              >
                <Row justify="end" gutter={[8, 8]}>
                  {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
                  <Col>
                    <QuestionCircleFilled />
                  </Col>
                </Row>
              </Col>
            </Row>
          }
          meta={props.meta}
          metaName={props.metaName}
          helpUrl={props.helpUrl}
          stopProducingQueryParams={props.stopProducingQueryParams}
          initialFormValue={{ ...props.initialFormValue, ...props.defaultFormValue } || {}}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            setSearchParams({ ...props.defaultFormValue, ...newFilterValues })
            props.updatedParams && props.updatedParams({ ...props.defaultFormValue, ...newFilterValues })
          }}
        />
      )}

      <ResponsiveTable {...props.tableProps} searchParams={searchParams} />
    </div>
  )
}
