import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  InputCol,
  LabelCol
} from "~/Component/Common/SearchFilters/common"
import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Row, Checkbox, Select, Form } from "antd"

const { Option } = Select

export function DropDownInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  const { value, show, toggleCheckboxHandler, filterValueChanged, label, isChecked } = props
  return isChecked ? (
    <Row>
      <LabelCol>
        <Checkbox checked={show} onChange={toggleCheckboxHandler}>
          {label}
        </Checkbox>
      </LabelCol>
      <InputCol className={show ? styles.offeringFilterField : "hidden"}>
        <Select
          aria-label={props.ariaLabel}
          style={{ width: 250 }}
          value={value}
          onChange={(value) => filterValueChanged(props.fieldName, value)}
        >
          {props.options &&
            props.options.map(({ label, value }, i) => (
              <Option value={value} key={`${value}_${i}`}>
                {label}
              </Option>
            ))}
        </Select>
      </InputCol>
    </Row>
  ) : (
    <Form.Item name={props.fieldName} label={label} labelCol={{ span: 6 }}>
      <Select aria-label={props.ariaLabel}>
        {props.options &&
          props.options.map(({ label, value }, i) => (
            <Option value={value} key={`${value}_${i}`}>
              {label}
            </Option>
          ))}
      </Select>
    </Form.Item>
  )
}
