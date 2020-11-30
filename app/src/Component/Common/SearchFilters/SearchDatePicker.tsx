import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { DatePicker, Form, Input } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"
import moment from "moment"

export function DatePickerInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  return (
    <>
      <Form.Item className="hidden" name={props.fieldName}>
        <Input />
      </Form.Item>
      <SearchFieldWrapper {...props} fieldName="">
        <DatePicker
          allowClear
          disabled={props.disabled}
          {...(props.defaultValue && {
            defaultValue: moment(props.defaultValue, DATE_FORMAT)
          })}
          onChange={(date, dateString) => {
            console.log("date", date, "dateString", dateString)
            dateString && props.formInstance.setFieldsValue({ [props.fieldName]: dateString })
          }}
          format={DATE_FORMAT}
        />
      </SearchFieldWrapper>
    </>
  )
}
