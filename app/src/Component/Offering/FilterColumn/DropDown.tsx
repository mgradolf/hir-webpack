import React from "react"
import { IFilterGenericComponentProps, InputCol, LabelCol } from "~/Component/Offering/FilterColumn/common"
import styles from "~/Component/Offering/FilterColumn.module.scss"
import { Row, Checkbox, Select } from "antd"

const { Option } = Select

export function DropDownInputType(props: IFilterGenericComponentProps) {
  const { value, show, toggleCheckboxHandler, filterValueChanged, label } = props
  return (
    <Row>
      <LabelCol>
        <Checkbox checked={show} onChange={toggleCheckboxHandler}>
          {label}
        </Checkbox>
      </LabelCol>
      <InputCol className={show ? styles.offeringFilterField : styles.hidden}>
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
  )
}
