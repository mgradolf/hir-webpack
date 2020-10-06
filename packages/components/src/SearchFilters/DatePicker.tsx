import React from "react"
import { IFilterFieldObject, IFilterGenericComponentProps, InputCol, LabelCol } from "./common"
import styles from "./SearchFilters.module.scss"
import { Row, Checkbox, DatePicker } from "antd"
import moment from "moment"
import { DATE_FORMAT } from "~/utils/Constants"

export default function DatePickerInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  const { value, show, toggleCheckboxHandler, filterValueChanged, label } = props
  return (
    <Row>
      <LabelCol>
        <Checkbox checked={show} onChange={toggleCheckboxHandler}>
          {label}
        </Checkbox>
      </LabelCol>
      <InputCol className={show ? styles.offeringFilterField : "hidden"}>
        <DatePicker
          allowClear
          value={value ? moment(value) : undefined}
          onChange={(value) => filterValueChanged(props.fieldName, value)}
          format={DATE_FORMAT}
        />
      </InputCol>
    </Row>
  )
}
