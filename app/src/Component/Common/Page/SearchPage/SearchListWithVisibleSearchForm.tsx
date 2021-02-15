import React, { useEffect, useState } from "react"
import { Button, Col, Row, Typography } from "antd"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import { IField } from "~/Component/Common/Form/common"
import { ResponsiveTable, IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { HelpModal } from "~/Component/Common/Modal/HelpModal"
export interface ISearchListWithVisibleSearchFormProp {
  title: string
  blocks?: JSX.Element[]
  meta?: IField[]
  tableProps: IDataTableProps
  initialFormValue?: { [key: string]: string }
  defaultFormValue?: { [key: string]: string }
  helpKey?: string
  stopProducingQueryParams?: boolean
  updatedParams?: (params?: any) => void
}

export default function SearchListWithVisibleSearchForm(props: ISearchListWithVisibleSearchFormProp) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>()
  const [help, setHelp] = useState(false)

  useEffect(() => {
    if (props.initialFormValue) setSearchParams(props.initialFormValue)
    // eslint-disable-next-line
  }, [])
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
        <MetaDrivenForm
          meta={props.meta}
          stopProducingQueryParams={props.stopProducingQueryParams}
          initialFormValue={{ ...props.initialFormValue, ...props.defaultFormValue } || {}}
          onApplyChanges={(newFilterValues, appliedFilterCount) => {
            setSearchParams({ ...props.defaultFormValue, ...newFilterValues })
            props.updatedParams && props.updatedParams({ ...props.defaultFormValue, ...newFilterValues })
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
