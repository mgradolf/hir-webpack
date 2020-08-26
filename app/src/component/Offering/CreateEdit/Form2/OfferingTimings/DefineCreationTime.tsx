import React, { useState } from "react"
import { Form, Radio, DatePicker, Select, Input, Col, Row } from "antd"
import { IOfferingFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import { RadioChangeEvent } from "antd/lib/radio"
import { hidden } from "~/utils/style"
import moment from "moment"

interface IOfferingTimings {
  fieldNames: IOfferingFieldNames
  formInstance: FormInstance
}

interface IDefineTime extends IOfferingTimings {
  terms: Array<any>
}

const dateFormat = "YYYY-MM-DD HH:mm:ss"

export default function DefineCreationTime(props: IDefineTime) {
  const radioValues = {
    byTime: "byTime",
    byTerm: "byTerm"
  }
  const [disableTime, setDisableTime] = useState(false)
  const [disableTerm, setDisableTerm] = useState(true)
  const [defaultRadioValue, setDefaultRadioValue] = useState(radioValues.byTime)

  const defaultCreationDate = props.formInstance.getFieldValue(props.fieldNames.CreationDate)

  const enableTime = () => {
    setDisableTime(false)
    setDisableTerm(true)
    setDefaultRadioValue(radioValues.byTerm)
    console.log("time : ", radioValues.byTime, defaultRadioValue, disableTime, disableTerm)
  }

  const enableTerm = () => {
    setDisableTerm(false)
    setDisableTime(true)
    setDefaultRadioValue(radioValues.byTime)
    console.log("term : ", radioValues.byTerm, defaultRadioValue, disableTime, disableTerm)
  }

  const handleChange = (e: RadioChangeEvent) => {
    if (e.target.value === radioValues.byTime) {
      enableTime()
    } else if (e.target.value === radioValues.byTerm) {
      enableTerm()
    }
  }

  const onDateChange = (value: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.CreationDate]: dateString })
  }

  return (
    <>
      <Form.Item name={props.fieldNames.CreationDate} style={hidden}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Radio.Group style={{ width: "100%" }} onChange={handleChange} defaultValue={defaultRadioValue}>
          <Row justify="center">
            <Col flex="1">
              <Radio style={{ marginBottom: "10px" }} value={radioValues.byTime}>
                Define creation time
              </Radio>
              <Form.Item label="Creation Date">
                <DatePicker
                  placeholder="YYYY/MM/DD"
                  disabled={disableTime}
                  format={dateFormat}
                  onChange={onDateChange}
                  defaultValue={defaultCreationDate ? moment(defaultCreationDate, dateFormat) : undefined}
                />
              </Form.Item>
            </Col>
            <Col flex="1">
              <Radio style={{ marginBottom: "10px" }} value={radioValues.byTerm}>
                Determined by term
              </Radio>
              <Form.Item label="Select term" name={props.fieldNames.StartTermID}>
                <Select disabled={disableTerm} placeholder="Choose a term">
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
