import React, { useEffect } from "react"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Form } from "antd"
import { FormInstance, Rule } from "antd/lib/form"
import { ValidateStatus } from "antd/lib/form/FormItem"

export const TEXT = "TEXT"
export const DROPDOWN = "DROPDOWN"
export const MULTI_SELECT_DROPDOWN = "MULTI_SELECT_DROPDOWN"
export const DATE_PICKER = "DATE_PICKER"
export const DATE_PICKERS = "DATE_PICKERS"
export const NUMBER = "NUMBER"
export const BOOLEAN = "BOOLEAN"
export const CUSTOM_FIELD = "CUSTOM_FIELD"

export type IFilterFieldType =
  | typeof TEXT
  | typeof DROPDOWN
  | typeof MULTI_SELECT_DROPDOWN
  | typeof DATE_PICKER
  | typeof DATE_PICKERS
  | typeof NUMBER
  | typeof BOOLEAN
  | typeof CUSTOM_FIELD

export interface IField {
  label: string
  inputType: IFilterFieldType
  hidden?: boolean
  placeholder?: string
  disabled?: boolean

  fieldName: string
  defaultValue?: any
  displayKey?: string
  valueKey?: string
  ariaLabel?: string

  fieldName2?: string
  defaultValue2?: any
  ariaLabel2?: string
  displayKey2?: string
  valueKey2?: string

  extraProps?: { [key: string]: any }
  options?: any[]
  refLookupService?: () => Promise<IApiResponse>
  customFilterComponent?: React.FunctionComponent<any>
  valueField?: string
  rules?: Rule[]
  validateStatus?: ValidateStatus
  help?: string
}

export interface IGeneratedField extends IField {
  formInstance: FormInstance
  clearTrigger?: boolean
}

export function SearchFieldWrapper(props: IField & { children?: React.ReactNode }) {
  return (
    <Form.Item
      colon={false}
      label={props.label}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      rules={props.rules}
      {...(props.fieldName !== "" && { name: props.fieldName })}
      {...(props.hidden && { className: "hidden" })}
      {...(props.extraProps && props.extraProps.valuePropName && { valuePropName: "checked" })}
      validateStatus={props.validateStatus}
      help={props.help}
    >
      {props.children}
    </Form.Item>
  )
}

export function SearchComponentWrapper(
  props: IField & {
    children?: React.ReactNode
  }
) {
  useEffect(() => {
    console.log(props)
  }, [props])
  return (
    <Form.Item
      colon={false}
      label={props.label}
      name={props.fieldName}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      rules={props.rules}
      validateStatus={props.validateStatus}
      help={props.help}
    >
      {props.children}
    </Form.Item>
  )
}
