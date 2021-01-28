import React, { useEffect, useState } from "react"
import { IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"
import { DatePicker, Form, Input } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"
import { useFirstRender } from "~/Hooks/useFirstRender"
import moment from "moment"

export function DatePickerInputType(props: IGeneratedField) {
  const firstRender = useFirstRender()
  const [defualtValue, setDefualtValue] = useState<any>(undefined)
  useEffect(() => {
    props.defaultValue && setDefualtValue(moment(props.defaultValue, DATE_FORMAT))
  }, [props.defaultValue])

  useEffect(() => {
    !firstRender && setDefualtValue(undefined)
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
          disabled={props.disabled}
          value={defualtValue}
          onChange={(date, dateString) => {
            console.log("date", date, "dateString", dateString)
            dateString && props.formInstance.setFieldsValue({ [props.fieldName]: dateString })
            setDefualtValue(date)
          }}
          format={DATE_FORMAT}
        />
      </SearchFieldWrapper>
    </>
  )
}
