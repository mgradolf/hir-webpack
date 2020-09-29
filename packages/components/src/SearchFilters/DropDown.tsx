import React from "react"
import { IFilterFieldObject, IFilterGenericComponentProps, InputCol, LabelCol } from "./common"
import styles from "./SearchFilters.module.scss"
import { Row, Checkbox, Select } from "antd"

const { Option } = Select

export default function DropDownInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
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
