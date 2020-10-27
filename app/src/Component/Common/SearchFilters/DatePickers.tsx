import React from "react"
import { IFilterFieldObject, IFilterGenericComponentProps, LabelCol } from "~/Component/Common/SearchFilters/common"
import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Row, Checkbox, DatePicker, Form } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"

export function DatePickersInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  return props.isChecked ? (
    <Row>
      <LabelCol>
        <Checkbox checked={props.show} onChange={props.toggleCheckboxHandler}>
          {props.label}
        </Checkbox>
      </LabelCol>
      <Row className={props.show ? styles.offeringFilterDateField : "hidden"}>
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          allowEmpty={[true, true]}
          aria-label={props.ariaLabel}
          allowClear
          onChange={(momentValues: any, values: any): void => {
            props.filterValueChanged(props.fieldName, values[0], props.fieldName2, values[1])
          }}
          format={DATE_FORMAT}
        />
      </Row>
    </Row>
  ) : (
    <Form.Item label={props.label} labelCol={{ span: 6 }}>
      <DatePicker.RangePicker
        style={{ width: "100%" }}
        allowEmpty={[true, true]}
        aria-label={props.ariaLabel}
        allowClear
        onChange={(momentValues: any, values: any): void => {
          props.filterValueChanged(props.fieldName, values[0], props.fieldName2, values[1])
        }}
        format={DATE_FORMAT}
      />
    </Form.Item>
  )
}
