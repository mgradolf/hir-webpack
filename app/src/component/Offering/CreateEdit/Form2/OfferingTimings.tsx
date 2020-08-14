import React, { useState, useEffect } from "react"
import { Form, Radio, DatePicker, Select, Divider, Input } from "antd"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import { RadioChangeEvent } from "antd/lib/radio"
import { getTerms } from "~/ApiServices/Service/RefLookupServiceWrap"

interface IOfferingTimings {
  fieldNames: IFieldNames
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
}

interface IDefineTime extends IOfferingTimings {
  terms: Array<any>
}
function DefineCreationTime(props: IDefineTime) {
  // const layout = {
  //   wrapperCol: { span: 12, offset: 10 }
  // }
  const radioValues = {
    byTime: 1,
    byTerm: 2
  }
  const [disableTerm, setDisableTerm] = useState(true)
  const [disableTime, setdisabByTime] = useState(true)
  const handleChange = (e: RadioChangeEvent) => {
    if (e.target.value === radioValues.byTime) {
      setdisabByTime(false)
      setDisableTerm(true)
    } else if (e.target.value === radioValues.byTerm) {
      setDisableTerm(false)
      setdisabByTime(true)
    } else {
      setDisableTerm(false)
      setdisabByTime(false)
    }
  }
  return (
    // <Form hideRequiredMark form={props.formInstance} initialValues={props.initialFormValue}>
    <>
      <Form.Item>
        <Radio.Group>
          <Radio value={radioValues.byTime} onChange={handleChange}>
            Define creation time
          </Radio>
          <Form.Item name={props.fieldNames.CreationDate} label="Creation Date">
            <DatePicker placeholder="YYYY/MM/DD" disabled={disableTime} format="YYYY/MM/DD" />
          </Form.Item>
          <Divider />
          <Radio value={radioValues.byTerm} onChange={handleChange}>
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
        </Radio.Group>
      </Form.Item>
    </>
    // </Form>
  )
}

function DefineTerminationTime(props: IDefineTime) {
  const layout = {
    labelCol: { span: 3 }
  }
  const radioValues = {
    byTime: 1,
    byDuration: 2,
    byTerm: 3
  }
  const [disableTime, setDisabByTime] = useState(true)
  const [disableDuration, setDisableDuration] = useState(true)
  const [disableTerm, setDisableTerm] = useState(true)

  const handleChange = (e: RadioChangeEvent) => {
    if (e.target.value === radioValues.byTime) {
      setDisabByTime(false)
      setDisableTerm(true)
      setDisableDuration(true)
    } else if (e.target.value === radioValues.byTerm) {
      setDisableTerm(false)
      setDisabByTime(true)
      setDisableDuration(true)
    } else if (e.target.value === radioValues.byDuration) {
      setDisableDuration(false)
      setDisableTerm(true)
      setDisabByTime(true)
    } else {
      setDisableDuration(false)
      setDisableTerm(false)
      setDisabByTime(false)
    }
  }
  return (
    // <Form hideRequiredMark form={props.formInstance} initialValues={props.initialFormValue} layout="horizontal">
    <Form.Item {...layout}>
      <Radio.Group>
        <Radio value={radioValues.byTime} onChange={handleChange}>
          Define termination time
        </Radio>
        <Form.Item name={props.fieldNames.TerminationDate} label="Termination Date" {...layout}>
          <DatePicker placeholder="YYYY/MM/DD" disabled={disableTime} format="YYYY/MM/DD" />
        </Form.Item>
        <Radio value={radioValues.byDuration} onChange={handleChange}>
          Determined by duration
        </Radio>
        <Form.Item name={radioValues.byDuration} {...layout}>
          <Input.Group compact>
            <Input placeholder="Year" disabled={disableDuration} />
            <Input placeholder="Month" disabled={disableDuration} />
            <Input placeholder="Week" disabled={disableDuration} />
            <Input placeholder="Day" disabled={disableDuration} />
            <Input placeholder="Hour" disabled={disableDuration} />
            <Input placeholder="Min" disabled={disableDuration} />
          </Input.Group>
        </Form.Item>
        <Radio value={radioValues.byTerm} onChange={handleChange}>
          Determined by term
        </Radio>
        <Form.Item label="Select term" name={props.fieldNames.EndTermID} {...layout}>
          <Select disabled={disableTerm} placeholder="Choose a term">
            {props.terms.map((term) => {
              return (
                <Select.Option key={term.TermID + term.Name} value={term.TermID}>
                  {term.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Radio.Group>
    </Form.Item>
    // </Form>
  )
}

export default function OfferingTimings(props: IOfferingTimings) {
  const [terms, setterms] = useState([])
  useEffect(() => {
    const loadTerms = async () => {
      const [response] = await getTerms()
      if (response) setterms(response.data)
    }
    loadTerms()
  }, [])
  return (
    <>
      <Divider />
      <DefineCreationTime {...props} terms={terms} />
      <Divider />
      <Divider />
      <DefineTerminationTime {...props} terms={terms} />
    </>
  )
}
