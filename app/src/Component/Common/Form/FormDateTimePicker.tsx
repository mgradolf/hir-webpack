import React, { useEffect, useState } from "react"
import moment from "moment"
import { IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"
import { DatePicker, Form, Input } from "antd"
import { DATE_TIME_FORMAT } from "~/utils/Constants"
import { useFirstRender } from "~/Hooks/useFirstRender"

export function FormDateTimePicker(props: IGeneratedField) {
  const firstRender = useFirstRender()
  const [value, setValue] = useState<any>(undefined)
  useEffect(() => {
    if (props.defaultValue) {
      const t1 = moment(props.defaultValue)
      setValue(t1)
      props.formInstance.setFieldsValue({ [props.fieldName]: t1.format(DATE_TIME_FORMAT) })
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
        <DatePicker
          allowClear
          showTime
          disabled={props.disabled}
          value={value}
          onChange={(date, dateString) => {
            dateString && props.formInstance.setFieldsValue({ [props.fieldName]: dateString })
            setValue(date)
          }}
          format={DATE_TIME_FORMAT}
        />
      </SearchFieldWrapper>
    </>
  )
}
