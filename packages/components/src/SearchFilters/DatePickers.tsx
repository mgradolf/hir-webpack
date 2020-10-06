import React from "react"
import { IFilterFieldObject, IFilterGenericComponentProps, LabelCol } from "./common"
import styles from "./SearchFilters.module.scss"
import { Row, Checkbox, DatePicker, Col } from "antd"
import moment from "moment"
import { DATE_FORMAT } from "~/utils/Constants"

export default function DatePickersInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  const {
    value,
    value2,
    show,
    valueKey,
    valueKey2,
    ariaLabel,
    ariaLabel2,
    toggleCheckboxHandler,
    filterValueChanged,
    label
  } = props
  return (
    <Row>
      <LabelCol>
        <Checkbox checked={show} onChange={toggleCheckboxHandler}>
          {label}
        </Checkbox>
      </LabelCol>
      <Row className={show ? styles.offeringFilterDateField : "hidden"}>
        <Col span={11}>
          {props.displayKey}
          <DatePicker
            allowClear
            aria-label={ariaLabel}
            value={value ? moment(value) : undefined}
            onChange={(value) => filterValueChanged(valueKey as string, value)}
            format={DATE_FORMAT}
          />
        </Col>
        <Col span={11} offset={2}>
          {props.displayKey2}
          <DatePicker
            aria-label={ariaLabel2}
            allowClear
            value={value2 ? moment(value2) : undefined}
            onChange={(value) => filterValueChanged(valueKey2 as string, value)}
            format={DATE_FORMAT}
          />
        </Col>
      </Row>
    </Row>
  )
}
