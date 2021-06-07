import React, { useEffect, useState } from "react"
import moment from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"
import { DatePicker, Form, Input } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"
import { useFirstRender } from "~/Hooks/useFirstRender"

export function FormDatePicker(props: IGeneratedField) {
  const firstRender = useFirstRender()
  const [value, setValue] = useState<any>(undefined)
  useEffect(() => {
    const date = props.defaultValue || props.formInstance.getFieldValue(props.fieldName)
    if (date) {
      const t1 = moment(date)
      setValue(t1)
      props.formInstance.setFieldsValue({ [props.fieldName]: t1.format(DATE_FORMAT) })
      console.log(t1)
      console.log(t1.format(DATE_FORMAT))
    }
    // eslint-disable-next-line
  }, [props.defaultValue])

  useEffect(() => {
    !firstRender && setValue(undefined)
    // eslint-disable-next-line
  }, [props.clearTrigger])
  return (
    <>
      <Form.Item className="hidden" name={props.fieldName}>
        <Input />
      </Form.Item>
      <SearchFieldWrapper {...props} fieldName="">
        {value && (
          <DatePicker
            allowClear
            disabled={props.disabled}
            defaultValue={value}
            onChange={(date, dateString) => {
              dateString && props.formInstance.setFieldsValue({ [props.fieldName]: dateString })
              setValue(date)
            }}
            format={DATE_FORMAT}
          />
        )}
        {!value && (
          <DatePicker
            allowClear
            disabled={props.disabled}
            onChange={(date, dateString) => {
              dateString && props.formInstance.setFieldsValue({ [props.fieldName]: dateString })
              setValue(date)
            }}
            format={DATE_FORMAT}
          />
        )}
      </SearchFieldWrapper>
    </>
  )
}
