import React from "react"
import { Form, Input, Row } from "antd"
import { IOfferingFieldNames } from "~/Component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import { hidden } from "~/utils/style"

interface IOfferingTimings {
  fieldNames: IOfferingFieldNames
  formInstance: FormInstance
}

interface IDefineTime extends IOfferingTimings {
  terms: Array<any>
}

interface IDefineDurationTime extends IDefineTime {
  disableDuration: boolean
}
export default function DefineDurationTime(props: IDefineDurationTime) {
  const fieldnames = {
    byYear: "byYear",
    byMonth: "byMonth",
    byWeek: "byWeek",
    byDay: "byDay",
    byHour: "byHour",
    byMinute: "byMinute"
  }
  const onChange = () => {
    let byYear = props.formInstance.getFieldValue(fieldnames.byYear)
    byYear = byYear ? byYear + "Y" : ""

    let byMonth = props.formInstance.getFieldValue(fieldnames.byMonth)
    byMonth = byMonth ? byMonth + "M" : ""

    let byWeek = props.formInstance.getFieldValue(fieldnames.byWeek)
    byWeek = byWeek ? byWeek + "W" : ""

    let byDay = props.formInstance.getFieldValue(fieldnames.byDay)
    byDay = byDay ? byDay + "D" : ""

    let byHour = props.formInstance.getFieldValue(fieldnames.byHour)
    byHour = byHour ? byHour + "H" : ""

    let byMinute = props.formInstance.getFieldValue(fieldnames.byMinute)
    byMinute = byMinute ? byMinute + "M" : ""

    // let recurrenceRule = "P1Y2M3W3DT2H3M"
    let recurrenceRule = "P" + byYear + byMonth + byWeek + byDay
    recurrenceRule += byHour || byMinute ? "T" + byHour + byMinute : ""
    console.log(recurrenceRule)
    props.formInstance.setFieldsValue({ [props.fieldNames.RecurrenceRule]: recurrenceRule })
  }

  return (
    <>
      <Form.Item name={props.fieldNames.RecurrenceRule} style={hidden}>
        <Input />
      </Form.Item>
      <Row justify="center">
        <Form.Item name={fieldnames.byYear}>
          <Input placeholder="Year" disabled={props.disableDuration} onChange={onChange} />
        </Form.Item>
        <Form.Item name={fieldnames.byMonth}>
          <Input placeholder="Month" disabled={props.disableDuration} onChange={onChange} />
        </Form.Item>
        <Form.Item name={fieldnames.byWeek}>
          <Input placeholder="Week" disabled={props.disableDuration} onChange={onChange} />
        </Form.Item>
      </Row>
      <Row justify="center">
        <Form.Item name={fieldnames.byDay}>
          <Input placeholder="Day" disabled={props.disableDuration} onChange={onChange} />
        </Form.Item>
        <Form.Item name={fieldnames.byHour}>
          <Input placeholder="Hour" disabled={props.disableDuration} onChange={onChange} />
        </Form.Item>
        <Form.Item name={fieldnames.byMinute}>
          <Input placeholder="Min" disabled={props.disableDuration} onChange={onChange} />
        </Form.Item>
      </Row>
    </>
  )
}
