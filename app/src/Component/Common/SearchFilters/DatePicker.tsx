import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  InputCol,
  LabelCol
} from "~/Component/Common/SearchFilters/common"
import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Row, Checkbox, DatePicker } from "antd"
import moment from "moment"

const dateFormat = "MM/DD/YYYY"

export function DatePickerInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
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
