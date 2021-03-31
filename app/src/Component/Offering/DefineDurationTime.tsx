import React, { useEffect } from "react"
import { Col, Form, Input, Row } from "antd"
import { IOfferingFieldNames } from "~/Component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"

interface IOfferingTimings {
  fieldNames: IOfferingFieldNames
  formInstance: FormInstance
}

interface IDefineDurationTime extends IOfferingTimings {
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

  const outputObject: Partial<IDurationValues> = {}

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
          if (/\dH/.test(match[i])) {
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
  }, [props.formInstance, props.fieldNames.RecurrenceRule])

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
    props.formInstance.setFieldsValue({ [props.fieldNames.RecurrenceRule]: recurrenceRule })
  }

  return (
    <>
      <Form.Item name={props.fieldNames.RecurrenceRule} className="hidden">
        <Input />
      </Form.Item>
      <Row>
        <Col md={4}>
          <Form.Item name={fieldnames.byYear}>
            <Input aria-label="Year" placeholder="Year" disabled={props.disableDuration} onChange={onChange} />
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item name={fieldnames.byMonth}>
            <Input aria-label="Month" placeholder="Month" disabled={props.disableDuration} onChange={onChange} />
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item name={fieldnames.byWeek}>
            <Input aria-label="Week" placeholder="Week" disabled={props.disableDuration} onChange={onChange} />
          </Form.Item>
        </Col>

        <Col md={4}>
          <Form.Item name={fieldnames.byDay}>
            <Input aria-label="Day" placeholder="Day" disabled={props.disableDuration} onChange={onChange} />
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item name={fieldnames.byHour}>
            <Input aria-label="Hour" placeholder="Hour" disabled={props.disableDuration} onChange={onChange} />
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item name={fieldnames.byMinute}>
            <Input aria-label="Minute" placeholder="Min" disabled={props.disableDuration} onChange={onChange} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
