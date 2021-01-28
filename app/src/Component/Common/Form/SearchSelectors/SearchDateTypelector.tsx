import React, { useState } from "react"
import { Row, Select, Col, Form, DatePicker, Input } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { DATE_FORMAT } from "~/utils/Constants"
import { IGeneratedField } from "~/Component/Common/Form/common"

export function SearchDateTypeSelector(props: IGeneratedField) {
  const [selectedKey, setSelectedKey] = useState(props?.extraProps?.selectorKeys[0].key1)
  const [selectedKey2, setSelectedKey2] = useState(props?.extraProps?.selectorKeys[0].key2)
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  return (
    <Form.Item>
      <Row>
        <Col span={6} offset={3} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
          <Select
            style={{ width: "100%" }}
            defaultValue={props?.extraProps?.selectorKeys[0].name}
            onChange={(value: string) => {
              if (props.extraProps && props.extraProps.selectorKeys && Array.isArray(props.extraProps.selectorKeys)) {
                for (const x of props.extraProps.selectorKeys) {
                  if (x.name === value) {
                    setSelectedKey(x.key1)
                    setSelectedKey2(x.key2)
                  }
                }
              }
            }}
          >
            {Array.isArray(props?.extraProps?.selectorKeys) &&
              props?.extraProps?.selectorKeys.map((x, i) => (
                <Select.Option key={i} value={x.name}>
                  {x.name}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={12}>
          <Form.Item className="hidden" name={selectedKey}>
            <Input />
          </Form.Item>
          <Form.Item className="hidden" name={selectedKey2}>
            <Input />
          </Form.Item>
          <DatePicker.RangePicker
            style={{ width: "100%" }}
            allowEmpty={[true, true]}
            aria-label={""}
            allowClear
            onChange={(momentValues: any, values: any): void => {
              props.formInstance.setFieldsValue({ [selectedKey]: values[0] })
              props.formInstance.setFieldsValue({ [selectedKey2]: values[1] })
            }}
            format={DATE_FORMAT}
          />
        </Col>
      </Row>
    </Form.Item>
  )
}
