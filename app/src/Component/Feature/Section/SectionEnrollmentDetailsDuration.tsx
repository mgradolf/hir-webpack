import React, { useEffect, useState } from "react"
import { Col, Form, Input, Row } from "antd"
import { ISectionEnrollmentDetails } from "~/Component/Feature/Section/Forms/SectionEnrollmentForm"
import { FormInstance } from "antd/lib/form"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"

interface IDefineDurationTime {
  fieldNames: ISectionEnrollmentDetails
  formInstance: FormInstance
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
const layout = { labelCol: { span: 6 } }

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

function DefineDurationTime(props: IDefineDurationTime) {
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
      const rule = props.formInstance.getFieldValue(props.fieldNames.DefaultEnrollmentDuration)
      console.log("Rules: ", rule)
      if (rule) {
        const durationValues = getDurationFromRule(rule)
        console.log("Value: ", durationValues)
        Object.keys(durationValues).forEach((field) => {
          props.formInstance.setFieldsValue({ [field]: durationValues[field] })
        })
      }
    }

    setDurationValues()
  }, [props.formInstance, props.fieldNames.DefaultEnrollmentDuration])

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
    props.formInstance.setFieldsValue({ [props.fieldNames.DefaultEnrollmentDuration]: recurrenceRule })
  }

  return (
    <>
      <Form.Item name={props.fieldNames.DefaultEnrollmentDuration} className="hidden">
        <Input />
      </Form.Item>
      <Row>
        <Col md={4}>
          <Form.Item name={fieldnames.byYear} {...layout}>
            <Input aria-label="Year" placeholder="Year" onChange={onChange} />
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item name={fieldnames.byMonth} {...layout}>
            <Input aria-label="Month" placeholder="Month" onChange={onChange} />
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item name={fieldnames.byWeek} {...layout}>
            <Input aria-label="Week" placeholder="Week" onChange={onChange} />
          </Form.Item>
        </Col>

        <Col md={4}>
          <Form.Item name={fieldnames.byDay} {...layout}>
            <Input aria-label="Day" placeholder="Day" onChange={onChange} />
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item name={fieldnames.byHour} {...layout}>
            <Input aria-label="Hour" placeholder="Hour" onChange={onChange} />
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item name={fieldnames.byMinute} {...layout}>
            <Input aria-label="Minute" placeholder="Min" onChange={onChange} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

interface IEnrollmentDurationDefault {
  fieldNames: ISectionEnrollmentDetails
  formInstance: FormInstance
}
export default function EnrollmentDurationDefault(props: IEnrollmentDurationDefault) {
  const values = {
    EnrollmentSpecificDate: "EnrollmentSpecificDate",
    FollowSectionDates: "FollowSectionDates"
  }

  const options = [
    { label: "Enrollment Specific Date", value: values.EnrollmentSpecificDate },
    { label: "Follow Section Dates", value: values.FollowSectionDates }
  ]

  const [selectedValue, setSelectedValue] = useState(values.FollowSectionDates)

  const onChange = (e: any) => {
    setSelectedValue(e)
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormDropDown
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Enrollment Duration Default"}
            fieldName={props.fieldNames.DefaultEnrollmentDuration}
            onChangeCallback={onChange}
            formInstance={props.formInstance}
            options={options}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          {selectedValue === values.EnrollmentSpecificDate && (
            <DefineDurationTime fieldNames={props.fieldNames} formInstance={props.formInstance} />
          )}
        </Col>
      </Row>
    </>
  )
}
