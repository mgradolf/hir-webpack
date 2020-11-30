import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { DatePicker, Input, Form } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"
import moment from "moment"

export function DatePickersInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  // const timeStamp = "____" + Date.now().toString()
  return (
    <>
      <Form.Item className="hidden" name={props.fieldName}>
        <Input />
      </Form.Item>
      <Form.Item className="hidden" name={props.fieldName2}>
        <Input />
      </Form.Item>
      <SearchFieldWrapper {...props} fieldName="">
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          allowEmpty={[true, true]}
          aria-label={props.ariaLabel}
          disabled={props.disabled}
          allowClear
          {...(props.defaultValue &&
            props.defaultValue2 && {
              defaultValue: [moment(props.defaultValue, DATE_FORMAT), moment(props.defaultValue2, DATE_FORMAT)]
            })}
          onChange={(momentValues: any, dateStrings: any): void => {
            props.formInstance.setFieldsValue({ [props.fieldName]: dateStrings[0] })
            if (props.fieldName2) {
              props.formInstance.setFieldsValue({ [props.fieldName2]: dateStrings[1] })
            }
          }}
          format={DATE_FORMAT}
        />
      </SearchFieldWrapper>
    </>
  )
}
