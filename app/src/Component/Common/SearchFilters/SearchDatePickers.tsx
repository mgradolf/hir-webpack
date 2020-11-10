import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { DatePicker, Input, Form } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"

export function DatePickersInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  return (
    <>
      <Form.Item className="hidden" name={props.fieldName}>
        <Input />
      </Form.Item>
      <Form.Item className="hidden" name={props.fieldName2}>
        <Input />
      </Form.Item>
      <SearchFieldWrapper {...props}>
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          allowEmpty={[true, true]}
          aria-label={props.ariaLabel}
          disabled={props.disabled}
          allowClear
          onChange={(momentValues: any, dateStrings: any): void => {
            dateStrings[0] && props.formInstance.setFieldsValue({ [props.fieldName]: dateStrings[0] })
            props.fieldName2 &&
              dateStrings[1] &&
              props.formInstance.setFieldsValue({ [props.fieldName2]: dateStrings[1] })
          }}
          format={DATE_FORMAT}
        />
      </SearchFieldWrapper>
    </>
  )
}
