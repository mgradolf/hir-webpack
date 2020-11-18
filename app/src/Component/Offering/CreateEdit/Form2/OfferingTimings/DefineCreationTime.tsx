import React, { useState, useEffect } from "react"
import { Form, Radio, DatePicker, Select, Input, Col, Row } from "antd"
import { IOfferingFieldNames } from "~/Component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import { RadioChangeEvent } from "antd/lib/radio"
import moment from "moment"
import { DATE_FORMAT } from "~/utils/Constants"

interface IOfferingTimings {
  fieldNames: IOfferingFieldNames
  formInstance: FormInstance
}

interface IDefineTime extends IOfferingTimings {
  terms: Array<any>
}

export default function DefineCreationTime(props: IDefineTime) {
  const radioValues = {
    byTime: "byTime",
    byTerm: "byTerm"
  }
  const [disableTime, setDisableTime] = useState(false)
  const [disableTerm, setDisableTerm] = useState(true)
  const [defaultRadioValue, setDefaultRadioValue] = useState(radioValues.byTime)

  const defaultCreationDate = props.formInstance.getFieldValue(props.fieldNames.CreationDate)

  useEffect(() => {
    let termId = props.formInstance.getFieldValue(props.fieldNames.StartTermID)
    termId = props.terms.find((x) => x.TermID === termId)
    if (!termId) {
      props.formInstance.setFieldsValue({ [props.fieldNames.StartTermID]: undefined })
    }
  })

  const enableTime = () => {
    setDisableTime(false)
    setDisableTerm(true)
    setDefaultRadioValue(radioValues.byTerm)
  }

  const enableTerm = () => {
    setDisableTerm(false)
    setDisableTime(true)
    setDefaultRadioValue(radioValues.byTime)
  }

  const handleChange = (e: RadioChangeEvent) => {
    if (e.target.value === radioValues.byTime) {
      enableTime()
      props.formInstance.setFieldsValue({ [props.fieldNames.StartTermID]: undefined })
    } else if (e.target.value === radioValues.byTerm) {
      enableTerm()
      props.formInstance.setFieldsValue({ [props.fieldNames.CreationDate]: undefined })
    }
  }

  const onDateChange = (value: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.CreationDate]: dateString })
  }

  return (
    <>
      <Form.Item name={props.fieldNames.CreationDate} className="hidden">
        <Input aria-label="Creation Date" />
      </Form.Item>
      <Form.Item>
        <Radio.Group
          aria-label="Define Creation Time"
          style={{ width: "100%" }}
          onChange={handleChange}
          defaultValue={defaultRadioValue}
        >
          <Row justify="center">
            <Col flex="1">
              <Radio style={{ marginBottom: "10px" }} value={radioValues.byTime}>
                Define creation time
              </Radio>
              <Form.Item label="Creation Date">
                <DatePicker
                  aria-label="Pick Creation Date"
                  placeholder="YYYY/MM/DD"
                  disabled={disableTime}
                  format={DATE_FORMAT}
                  onChange={onDateChange}
                  defaultValue={defaultCreationDate ? moment(defaultCreationDate, DATE_FORMAT) : undefined}
                />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Radio style={{ marginBottom: "10px" }} value={radioValues.byTerm}>
                Determined by Start Term
              </Radio>
              <Form.Item label="Select term" name={props.fieldNames.StartTermID}>
                <Select aria-label="Term Select" disabled={disableTerm} placeholder="Choose a term">
                  {props.terms.map((term) => {
                    return (
                      <Select.Option key={term.TermID} value={term.TermID}>
                        {term.Name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>
    </>
  )
}
