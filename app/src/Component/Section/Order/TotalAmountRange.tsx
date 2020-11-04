import { Col, Input, Row } from "antd"
import React from "react"
import {
  IFilterFieldComponent,
  IFilterGenericComponentProps,
  SearchComponentWrapper
} from "~/Component/Common/SearchFilters/common"

export default function TotalAmountRange(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchComponentWrapper {...props}>
      <Row>
        <Col span={12}>
          <Input
            type="number"
            placeholder="From"
            onChange={(e) => props.filterValueChanged({ TotalAmountFrom: e.target.value })}
          />
        </Col>
        <Col span={12}>
          <Input
            type="number"
            placeholder="To"
            onChange={(e) => props.filterValueChanged({ TotalAmountTo: e.target.value })}
          />
        </Col>
      </Row>
    </SearchComponentWrapper>
  )
}
