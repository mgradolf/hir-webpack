import { Col, Form, Input, Row } from "antd"
import React from "react"
import {
  IFilterFieldComponent,
  IFilterGenericComponentProps,
  SearchComponentWrapper
} from "~/Component/Common/SearchFilters/common"

export default function TotalAmountRange(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <>
      <Form.Item className="hidden" name={props.fieldName}>
        <Input />
      </Form.Item>
      <Form.Item className="hidden" name={props.fieldName2}>
        <Input />
      </Form.Item>
      <SearchComponentWrapper {...props}>
        <Row>
          <Col span={12}>
            <Input
              type="number"
              placeholder="From"
              onChange={(e) => props.formInstance.setFieldsValue({ [props.fieldName]: e.target.value })}
            />
          </Col>
          <Col span={12}>
            <Input
              type="number"
              placeholder="To"
              onChange={(e) => props.formInstance.setFieldsValue({ [props.fieldName2 || ""]: e.target.value })}
            />
          </Col>
        </Row>
      </SearchComponentWrapper>
    </>
  )
}
