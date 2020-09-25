import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  InputCol,
  LabelCol
} from "~/Component/Common/SearchFilters/common"
import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Row, Checkbox, Input } from "antd"

export function TextInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  const { value, show, toggleCheckboxHandler, filterValueChanged, label } = props
  return (
    <Row>
      <LabelCol>
        <Checkbox checked={show} onChange={toggleCheckboxHandler}>
          {label}
        </Checkbox>
      </LabelCol>
      <InputCol className={show ? styles.offeringFilterField : styles.hidden}>
        <Input
          aria-label={props.ariaLabel}
          name={props.fieldName}
          defaultValue={props.defaultValue}
          value={value === "*" ? "" : value}
          onChange={(e) => filterValueChanged(props.fieldName, e.target.value)}
        />
      </InputCol>
    </Row>
  )
}
