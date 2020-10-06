import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  InputCol,
  LabelCol
} from "~/Component/Common/SearchFilters/common"
import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Row, Checkbox, Input } from "antd"
import TextInput from "~/Component/Common/Form/TextInput"

export function TextInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  const { value, show, toggleCheckboxHandler, filterValueChanged, label, isChecked } = props
  return isChecked ? (
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
          type={props.inputType.toLowerCase()}
          defaultValue={props.defaultValue}
          value={value === "*" ? "" : value}
          onChange={(e) => filterValueChanged(props.fieldName, e.target.value)}
        />
      </InputCol>
    </Row>
  ) : (
    <TextInput
      item={{
        label,
        name: props.fieldName,
        labelCol: { span: 6 }
      }}
      input={{ "aria-label": props.ariaLabel, type: props.inputType.toLowerCase() }}
    />
  )
}
