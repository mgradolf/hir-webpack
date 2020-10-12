import { Col, Form, Input, Row } from "antd"
import React from "react"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"

export default function TotalAmountRangeForOrderManagement(
  props: IFilterGenericComponentProps<IFilterFieldComponent> & { key: any }
) {
  return (
    <Form.Item labelCol={{ span: 6 }} label="Total Amount From">
      <Row>
        <Col span={10}>
          <Input type="number" onChange={(e) => props.filterValueChanged({ TotalAmountFrom: e.target.value })} />
        </Col>
        <Col span={4} style={{ textAlign: "center" }}>
          To
        </Col>
        <Col span={10}>
          <Input type="number" onChange={(e) => props.filterValueChanged({ TotalAmountTo: e.target.value })} />
        </Col>
      </Row>
    </Form.Item>
  )
}
