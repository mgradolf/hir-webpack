import React, { useState } from "react"
import { IGeneratedField } from "~/Component/Common/Form/common"
import { Row, Select, Col } from "antd"

interface ISelector {
  label?: string
  fieldName: string
  valueField?: string
  defaultValue?: any
  component: (props?: any) => JSX.Element
}
export function FormFieldSelector(props: IGeneratedField) {
  const selectorKeys =
    Array.isArray(props?.extraProps?.selectorKeys) && (props?.extraProps?.selectorKeys as ISelector[])
  const [selectedKey, setSelectedKey] = useState(Array.isArray(selectorKeys) && selectorKeys[0].fieldName)
  const rulesRequired = !!props.rules?.find((rule: any) => rule && rule.required)

  const toRender = selectorKeys ? (
    <Row>
      {rulesRequired && (
        <Col span={1} xs={1} style={{ color: "#ff4d4f", fontSize: "14px", textAlignLast: "end", paddingRight: "3px" }}>
          *
        </Col>
      )}
      <Col span={rulesRequired ? 7 : 8}>
        <Select
          style={{ width: "100%" }}
          defaultValue={selectorKeys[0].label || ""}
          onChange={(value: string) => {
            setSelectedKey(value)
          }}
        >
          {Array.isArray(selectorKeys) &&
            selectorKeys.map((x, i) => (
              <Select.Option key={i} value={x.fieldName}>
                {x.label}
              </Select.Option>
            ))}
        </Select>
      </Col>
      {selectorKeys.map((x, i) => {
        return (
          <React.Fragment key={i}>
            {selectedKey === x.fieldName && (
              <Col flex="auto">
                <x.component
                  {...props}
                  label=""
                  fieldName={x.fieldName}
                  valueField={x.valueField}
                  defaultValue={x.defaultValue}
                  // rules={[]}
                />
              </Col>
            )}
          </React.Fragment>
        )
      })}
    </Row>
  ) : null
  return toRender
}
