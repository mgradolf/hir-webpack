import React, { useState } from "react"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { Row, Input, Select, Col, Form } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"

export function SearchPersonSelector(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  const [selectedKey, setSelectedKey] = useState(props?.extraProps?.selectorKeys[0].name || "")
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  return props.isCheckeble ? (
    <Row></Row>
  ) : (
    <Form.Item>
      <Row>
        <Col span={6} offset={3} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
          <Select
            style={{ width: "100%" }}
            defaultValue={props?.extraProps?.selectorKeys[0].name || ""}
            onChange={(value: string) => {
              setSelectedKey(value)
            }}
          >
            {Array.isArray(props?.extraProps?.selectorKeys) &&
              props?.extraProps?.selectorKeys.map((x, i) => (
                <Select.Option key={i} value={x.key}>
                  {x.name}
                </Select.Option>
              ))}
          </Select>
        </Col>
        <Col span={12}>
          <Form.Item name={selectedKey}>
            <Input id="personSelectorValue" type="text" allowClear />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  )
}
