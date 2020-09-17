import React from "react"
import { IFilterGenericComponentProps, InputCol, LabelCol } from "~/Component/Offering/FilterColumn/common"
import styles from "~/Component/Offering/FilterColumn.module.scss"
import { Row, Checkbox, DatePicker } from "antd"
import moment from "moment"

const dateFormat = "MM/DD/YYYY"

export function DatePickerInputType(props: IFilterGenericComponentProps) {
  const { value, show, toggleCheckboxHandler, filterValueChanged, label } = props
  return (
    <Row>
      <LabelCol>
        <Checkbox checked={show} onChange={toggleCheckboxHandler}>
          {label}
        </Checkbox>
      </LabelCol>
      <InputCol className={show ? styles.offeringFilterField : styles.hidden}>
        <DatePicker
          allowClear
          value={value ? moment(value) : undefined}
          onChange={(value) => filterValueChanged(props.fieldName, value)}
          format={dateFormat}
        />
      </InputCol>
    </Row>
  )
}
