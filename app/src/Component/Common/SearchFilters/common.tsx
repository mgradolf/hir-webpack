import React, { ReactNode, useState } from "react"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Col, Row, Checkbox, Form } from "antd"
import { ColProps } from "antd/lib/col"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { FormInstance } from "antd/lib/form"

export const TEXT = "TEXT"
export const DROPDOWN = "DROPDOWN"
export const DATE_PICKER = "DATE_PICKER"
export const DATE_PICKERS = "DATE_PICKERS"
export const NUMBER = "NUMBER"
export const BOOLEAN = "BOOLEAN"

export type IFilterFieldType =
  | typeof TEXT
  | typeof DROPDOWN
  | typeof DATE_PICKER
  | typeof DATE_PICKERS
  | typeof NUMBER
  | typeof BOOLEAN

export interface IFilterFieldObject {
  label: string
  inputType: IFilterFieldType
  hidden?: boolean
  defaultValue?: any
  placeholder?: string
  disabled?: boolean

  fieldName: string
  displayKey?: string
  valueKey?: string
  ariaLabel?: string

  fieldName2?: string
  ariaLabel2?: string
  displayKey2?: string
  valueKey2?: string

  fullWidth?: boolean
  extraProps?: { [key: string]: any }
  options?: any[]
  refLookupService?: () => Promise<IApiResponse>
  requestService?: () => Promise<IApiResponse>
}

export interface IFilterFieldComponent {
  label: string
  fieldName: string
  valueField?: string
  label2?: string
  fieldName2?: string
  valueField2?: string
  customFilterComponent: React.FunctionComponent<any>
  fullWidth?: boolean
  extraProps?: { [key: string]: any }
}

export type IFilterField = IFilterFieldObject | IFilterFieldComponent

export function isFilterObject(field: IFilterField): field is IFilterFieldObject {
  return (field as IFilterFieldComponent).customFilterComponent === undefined
}

export type IFilterGenericComponentProps<Field> = Field extends IFilterFieldObject
  ? IFilterFieldObject & {
      isCheckeble?: boolean
      formInstance: FormInstance
    }
  : IFilterFieldComponent & {
      isCheckeble?: boolean
      value: { [key: string]: string | number }
      filterValueChanged: (newValues: { [key: string]: string | number | boolean }) => void
      formInstance: FormInstance
      clearTrigger: boolean
    }

const layout = {
  label: {
    md: 24,
    lg: 24,
    xl: 24,
    xxl: 24,
    sm: 24,
    xs: 24
  },
  input: {
    md: 20,
    lg: 20,
    xl: 20,
    xxl: 20,
    sm: 20,
    xs: 20
  }
}

export function LabelCol(props: ColProps) {
  return <Col {...layout.label} {...props} />
}

export function InputCol(props: ColProps) {
  return <Col {...layout.input} {...props} />
}

export function SearchFieldWrapper(
  props: IFilterGenericComponentProps<IFilterFieldObject> & { children?: React.ReactNode }
) {
  const [checked, setChecked] = useState(false)
  const toggleCheckboxHandler = (event: CheckboxChangeEvent) => {
    setChecked(event.target.checked)
  }
  return props.isCheckeble ? (
    <Row {...(props.hidden && { className: "hidden" })}>
      <LabelCol>
        <Checkbox onChange={toggleCheckboxHandler}>{props.label}</Checkbox>
      </LabelCol>
      <InputCol className={checked ? styles.offeringFilterField : "hidden"}>
        <Form.Item
          name={props.fieldName}
          {...(props.extraProps && props.extraProps.valuePropName && { valuePropName: "checked" })}
        >
          {props.children}
        </Form.Item>
      </InputCol>
    </Row>
  ) : (
    <Form.Item
      colon={false}
      label={props.label}
      name={props.fieldName}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      {...(props.hidden && { className: "hidden" })}
      {...(props.extraProps && props.extraProps.valuePropName && { valuePropName: "checked" })}
    >
      {props.children}
    </Form.Item>
  )
}

export function SearchComponentWrapper(
  props: IFilterGenericComponentProps<IFilterFieldComponent> & {
    children?: React.ReactNode
  }
) {
  const [checked, setChecked] = useState(false)
  const toggleCheckboxHandler = (event: CheckboxChangeEvent) => {
    setChecked(event.target.checked)
  }
  return props.isCheckeble ? (
    <Row>
      <LabelCol>
        <Checkbox onChange={toggleCheckboxHandler}>{props.label}</Checkbox>
      </LabelCol>
      <InputCol className={checked ? styles.offeringFilterField : "hidden"}>{props.children}</InputCol>
    </Row>
  ) : (
    <Form.Item
      colon={false}
      label={props.label}
      name={props.fieldName}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
    >
      {props.children}
    </Form.Item>
  )
}
