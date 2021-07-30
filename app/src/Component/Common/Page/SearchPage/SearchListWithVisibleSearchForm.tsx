import React, { useEffect, useState } from "react"
import { Col, Row, Typography } from "antd"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import { IField } from "~/Component/Common/Form/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

export interface ISearchListWithVisibleSearchFormProp {
  title: string
  blocks?: JSX.Element[]
  meta?: IField[]
  metaName?: string
  tableProps: IDataTableProps
  initialFormValue?: { [key: string]: string }
  defaultFormValue?: { [key: string]: string }
  helpKey?: string
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
              <Col xs={24} sm={12}>
                <Row justify="end" gutter={[8, 8]}>
                  {props.blocks && props.blocks.map((x, i) => <Col key={i}>{x}</Col>)}
                  <Col>
                    <HelpButton helpKey={props.helpKey} />
                  </Col>
                </Row>
              </Col>
            </Row>
          }
          meta={props.meta}
          metaName={props.metaName}
          stopProducingQueryParams={props.stopProducingQueryParams}
          initialFormValue={{ ...props.initialFormValue } || {}}
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
