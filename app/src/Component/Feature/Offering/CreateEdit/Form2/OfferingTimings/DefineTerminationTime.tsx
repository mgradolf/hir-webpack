import React, { useState, useEffect } from "react"
import { Form, Radio, DatePicker, Select, Input, Col, Row } from "antd"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import { RadioChangeEvent } from "antd/lib/radio"
import DefineDurationTime from "~/Component/Feature/Offering/CreateEdit/Form2/OfferingTimings/DefineDurationTime"
import moment from "moment"
import { DATE_FORMAT } from "~/utils/Constants"

interface IOfferingTimings {
  fieldNames: IOfferingFieldNames
  formInstance: FormInstance
}

interface IDefineTime extends IOfferingTimings {
  terms: Array<any>
}

export default function DefineTerminationTime(props: IDefineTime) {
  const radioValues = {
    byTime: 1,
    byDuration: 2,
    byTerm: 3
  }

  const [defaultRadioValue, setDefaultRadioValue] = useState(radioValues.byTime)
  const [disableTime, setDisabByTime] = useState(false)
  const [disableDuration, setDisableDuration] = useState(true)
  const [disableTerm, setDisableTerm] = useState(true)

  useEffect(() => {
    let termId = props.formInstance.getFieldValue(props.fieldNames.EndTermID)
    termId = props.terms.find((x) => x.TermID === termId)
    if (!termId) {
      props.formInstance.setFieldsValue({ [props.fieldNames.EndTermID]: undefined })
    }
  })
  const enableTime = () => {
    setDisabByTime(false)
    setDisableTerm(true)
    setDisableDuration(true)
    setDefaultRadioValue(radioValues.byTime)
  }
  const enableTerm = () => {
    setDisabByTime(true)
    setDisableTerm(false)
    setDisableDuration(true)
    setDefaultRadioValue(radioValues.byTerm)
  }
  const enableDuration = () => {
    setDisableTerm(true)
    setDisabByTime(true)
    setDisableDuration(false)
    setDefaultRadioValue(radioValues.byDuration)
  }

  const handleChange = (e: RadioChangeEvent) => {
    if (e.target.value === radioValues.byTime) {
      enableTime()
      props.formInstance.setFieldsValue({ [props.fieldNames.EndTermID]: undefined })
      props.formInstance.setFieldsValue({ [props.fieldNames.RecurrenceRule]: undefined })
    } else if (e.target.value === radioValues.byTerm) {
      enableTerm()
      props.formInstance.setFieldsValue({ [props.fieldNames.TerminationDate]: undefined })
      props.formInstance.setFieldsValue({ [props.fieldNames.RecurrenceRule]: undefined })
    } else if (e.target.value === radioValues.byDuration) {
      enableDuration()
      props.formInstance.setFieldsValue({ [props.fieldNames.TerminationDate]: undefined })
      props.formInstance.setFieldsValue({ [props.fieldNames.EndTermID]: undefined })
    }
  }

  const defaultTerminationDate = props.formInstance.getFieldValue(props.fieldNames.TerminationDate)

  const onDateChange = (value: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.TerminationDate]: dateString })
  }
  return (
    <Radio.Group style={{ width: "100%" }} defaultValue={defaultRadioValue}>
      <Row justify="center">
        <Col flex="1">
          <Radio style={{ marginBottom: "10px" }} value={radioValues.byTime} onChange={handleChange}>
            Define termination time
          </Radio>
          <Form.Item label="Termination Date">
            <DatePicker
              aria-label="Pick Termination Date"
              placeholder="YYYY/MM/DD"
              disabled={disableTime}
              format={DATE_FORMAT}
              onChange={onDateChange}
              defaultValue={defaultTerminationDate ? moment(defaultTerminationDate, DATE_FORMAT) : undefined}
            />
          </Form.Item>
          <Form.Item name={props.fieldNames.TerminationDate} className="hidden">
            <Input aria-label="Termination Date" />
          </Form.Item>
        </Col>
        <Col flex="1">
          <Radio style={{ marginBottom: "10px" }} value={radioValues.byTerm} onChange={handleChange}>
            Determined by End Term
          </Radio>
          <Form.Item label="Select term" name={props.fieldNames.EndTermID}>
            <Select aria-label="Term Select" disabled={disableTerm} placeholder="Choose a term">
              {props.terms.map((term) => {
                return (
                  <Select.Option key={term.TermID + term.Name} value={term.TermID}>
                    {term.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Radio style={{ marginBottom: "10px" }} value={radioValues.byDuration} onChange={handleChange}>
            Determined by duration
          </Radio>
          <DefineDurationTime {...props} disableDuration={disableDuration} />
        </Col>
      </Row>
    </Radio.Group>
  )
}
