import React from "react"
import { Form, Input, Row } from "antd"
import { IOfferingFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import { hidden } from "~/utils/style"
import { useEffect } from "react"

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

interface IValues {
  [key: string]: string
}

interface IDurationValues extends IValues {
  byYear: string
  byMonth: string
  byWeek: string
  byDay: string
  byHour: string
  byMinute: string
}

function getDurationFromRule(referenceString: string) {
  const periodRegex = "P(\\dY)?(\\dM)?(\\dW)?(\\dD)?"
  const timeRegex = "T(\\dH)?(\\dM)?"
  const regExp = new RegExp(`^${periodRegex}|${timeRegex}$`, "g")

  let outputObject: Partial<IDurationValues> = {}

  function extractNumber(inputString: string) {
    return inputString.replace(/\D+/g, "")
  }

  let match
  while ((match = regExp.exec(referenceString))) {
    if (new RegExp(periodRegex).test(match[0])) {
      for (let i = 1; i < match.length - 1; i++) {
        if (match[i]) {
          if (/\dY/.test(match[i])) {
            outputObject.byYear = extractNumber(match[i])
          }

          if (/\dM/.test(match[i])) {
            outputObject.byMonth = extractNumber(match[i])
          }

          if (/\dW/.test(match[i])) {
            outputObject.byWeek = extractNumber(match[i])
          }

          if (/\dD/.test(match[i])) {
            outputObject.byDay = extractNumber(match[i])
          }
        }
      }
    }

    if (new RegExp(timeRegex).test(match[0])) {
      for (let i = 1; i < match.length; i++) {
        if (match[i]) {
          if (/\dM/.test(match[i])) {
            outputObject.byHour = extractNumber(match[i])
          }

          if (/\dM/.test(match[i])) {
            outputObject.byMinute = extractNumber(match[i])
          }
        }
      }
    }
  }

  return outputObject
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

  useEffect(() => {
    function setDurationValues() {
      const rule = props.formInstance.getFieldValue(props.fieldNames.RecurrenceRule)
      if (rule) {
        const durationValues = getDurationFromRule(rule)
        Object.keys(durationValues).forEach((field) => {
          props.formInstance.setFieldsValue({ [field]: durationValues[field] })
        })
      }
    }

    setDurationValues()
  }, [])

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
