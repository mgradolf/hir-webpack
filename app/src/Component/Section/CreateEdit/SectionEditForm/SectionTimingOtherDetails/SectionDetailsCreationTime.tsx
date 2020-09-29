import React, { useState, useEffect } from "react"
import { Form, Radio, DatePicker, Select, Input } from "antd"
import { RadioChangeEvent } from "antd/lib/radio"
import { FormInstance } from "antd/lib/form"
import { ISectionDetailsFieldNames } from "~/Component/Section/CreateEdit/SectionEditForm/SectionDetails"
import { getTerms } from "~/ApiServices/Service/RefLookupService"

const creationTimeOptionsValue = {
  datePicker: "datePicker",
  select: "select"
}
const creationTimeOptions = [
  { label: "Define Creation Time", value: "datePicker" },
  { label: "Determined by Term", value: "select" }
]

interface ISectionDetailsCreationTime {
  formInstance: FormInstance
  fieldNames: ISectionDetailsFieldNames
}
const dateFormat = "YYYY-MM-DD HH:mm:ss"
const layout = { labelCol: { span: 6 } }

export default function SectionDetailsCreationTime(props: ISectionDetailsCreationTime) {
  const [selectedCreationTime, setSelectedCreationTime] = useState()
  const defaultCreationDate = props.formInstance.getFieldValue(props.fieldNames.CreationDate)

  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectedCreationTime(e.target.value)
    if (e.target.value === creationTimeOptionsValue.datePicker) {
      props.formInstance.setFieldsValue({ [props.fieldNames.StartTermID]: undefined })
    } else if (e.target.value === creationTimeOptionsValue.select) {
      props.formInstance.setFieldsValue({ [props.fieldNames.CreationDate]: undefined })
    }
  }

  const onDateChange = (date: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.CreationDate]: dateString })
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
      <Form.Item>
        <Radio.Group options={creationTimeOptions} onChange={onRadioChange} optionType="button" buttonStyle="solid" />
      </Form.Item>
      {selectedCreationTime === creationTimeOptionsValue.datePicker && (
        <>
          <Form.Item name={props.fieldNames.CreationDate} className="hidden">
            <Input />
          </Form.Item>
          <Form.Item label="Creation Date" {...layout}>
            <DatePicker
              aria-label="Pick Creation Date"
              placeholder="YYYY/MM/DD"
              format={dateFormat}
              onChange={onDateChange}
              defaultValue={defaultCreationDate}
            />
          </Form.Item>
        </>
      )}
      {selectedCreationTime === creationTimeOptionsValue.select && (
        <Form.Item label="Choose a Term" name={props.fieldNames.StartTermID} {...layout}>
          <Select aria-label="Select start term">
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
