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
  return props.isChecked ? (
    <Row {...(props.hidden && props.defaultValue && { className: "hidden" })}>
      <LabelCol>
        <Checkbox checked={props.show} onChange={props.toggleCheckboxHandler}>
          {props.label}
        </Checkbox>
      </LabelCol>
      <InputCol className={props.show ? styles.offeringFilterField : "hidden"}>
        <Input
          aria-label={props.ariaLabel}
          name={props.fieldName}
          type={props.inputType.toLowerCase()}
          defaultValue={props.defaultValue}
          value={props.value === "*" ? "" : props.value}
          onChange={(e) => props.filterValueChanged(props.fieldName, e.target.value)}
        />
      </InputCol>
    </Row>
  ) : (
    <TextInput
      item={{
        label: props.label,
        name: props.fieldName,
        labelCol: { span: 6 },
        ...(props.hidden && props.defaultValue && { className: "hidden" })
      }}
      input={{ "aria-label": props.ariaLabel, type: props.inputType.toLowerCase() }}
    />
  )
}
