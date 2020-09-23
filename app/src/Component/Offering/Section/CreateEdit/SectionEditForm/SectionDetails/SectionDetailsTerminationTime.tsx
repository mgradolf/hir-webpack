import React, { useState, useEffect } from "react"
import { Form, Radio, DatePicker, Select, Input } from "antd"
import { RadioChangeEvent } from "antd/lib/radio"
import { FormInstance } from "antd/lib/form"
import { ISectionDetailsFieldNames } from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionDetails"
import SectionDetailsTerminationDuration from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionDetails/SectionDetailsTerminationDuration"
import { getTerms } from "~/ApiServices/Service/RefLookupService"

const terminationTimeOptionsValue = {
  datePicker: "datePicker",
  duration: "duration",
  select: "select"
}
const terminationTimeOptions = [
  { label: "Define Termination Time", value: "datePicker" },
  { label: "Determined by Duration", value: "duration" },
  { label: "Determined by Term", value: "select" }
]

interface ISectionDetailsTerminationTimeProps {
  formInstance: FormInstance
  fieldNames: ISectionDetailsFieldNames
}

const dateFormat = "YYYY-MM-DD HH:mm:ss"
const layout = { labelCol: { span: 6 } }

export default function SectionDetailsTerminationTime(props: ISectionDetailsTerminationTimeProps) {
  const [selectedTerminationTime, setSelectedTerminationTime] = useState()
  const defaultTerminationDate = props.formInstance.getFieldValue(props.fieldNames.TerminationDate)

  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectedTerminationTime(e.target.value)
    if (e.target.value === terminationTimeOptionsValue.datePicker) {
      props.formInstance.setFieldsValue({ [props.fieldNames.EndTermID]: undefined })
    } else if (e.target.value === terminationTimeOptionsValue.select) {
      props.formInstance.setFieldsValue({ [props.fieldNames.TerminationDate]: undefined })
    }
  }

  const onDateChange = (date: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.TerminationDate]: dateString })
    console.log(date)
    console.log(dateString)
    console.log(props.formInstance.getFieldsValue())
  }

  const [terms, setTerms] = useState<Array<any>>([])
  useEffect(() => {
    getTerms().then((response) => {
      if (response.success) {
        setTerms(response.data)
      }
    })
  }, [setTerms])
  return (
    <>
      <Form.Item {...layout}>
        <Radio.Group
          options={terminationTimeOptions}
          onChange={onRadioChange}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>
      {selectedTerminationTime === terminationTimeOptionsValue.datePicker && (
        <>
          <Form.Item name={props.fieldNames.TerminationDate} className="hidden">
            <Input />
          </Form.Item>
          <Form.Item label="Termination Date" {...layout}>
            <DatePicker
              aria-label="Pick Termination Date"
              placeholder="YYYY/MM/DD"
              format={dateFormat}
              onChange={onDateChange}
              defaultValue={defaultTerminationDate}
            />
          </Form.Item>
        </>
      )}

      {selectedTerminationTime === terminationTimeOptionsValue.duration && (
        <SectionDetailsTerminationDuration formInstance={props.formInstance} fieldNames={props.fieldNames} />
      )}

      {selectedTerminationTime === terminationTimeOptionsValue.select && (
        <Form.Item label="Choose a Term" name={props.fieldNames.EndTermID} {...layout}>
          <Select aria-label="Select End term">
            {terms.map((term, i) => (
              <Select.Option key={term.TermID} value={term.TermID}>
                {term.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </>
  )
}
