import React from "react"
import { Form, DatePicker, Input } from "antd"
import { FormInstance } from "antd/lib/form"
import { ISectionDetailsFieldNames } from "~/Component/Section/CreateEdit/SectionEditForm/SectionDetails"
import { DATE_FORMAT } from "~/utils/Constants"

interface ISectionDetailsEnrollmentBillingDate {
  formInstance: FormInstance
  fieldNames: ISectionDetailsFieldNames
}

const layout = { labelCol: { span: 6 } }

export default function SectionDetailsEnrollmentBillingDate(props: ISectionDetailsEnrollmentBillingDate) {
  const defaultEnrollmentDate = props.formInstance.getFieldValue(props.fieldNames.FinalEnrollmentDate)
  const defaultBillingDate = props.formInstance.getFieldValue(props.fieldNames.BillingDate)

  const onEnrollmentDateChange = (date: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.FinalEnrollmentDate]: dateString })
  }
  const onBillingDateChange = (date: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.BillingDate]: dateString })
  }
  return (
    <>
      <Form.Item name={props.fieldNames.FinalEnrollmentDate} className="hidden">
        <Input />
      </Form.Item>
      <Form.Item name={props.fieldNames.BillingDate} className="hidden">
        <Input />
      </Form.Item>
      <Form.Item label="Final Enrollment Date" {...layout}>
        <DatePicker
          aria-label="Pick Enrollment Date"
          placeholder="YYYY/MM/DD"
          format={DATE_FORMAT}
          onChange={onEnrollmentDateChange}
          defaultValue={defaultEnrollmentDate}
        />
      </Form.Item>
      <Form.Item label="Billing Date" {...layout}>
        <DatePicker
          aria-label="Pick Billing Date"
          placeholder="YYYY/MM/DD"
          format={DATE_FORMAT}
          onChange={onBillingDateChange}
          defaultValue={defaultBillingDate}
        />
      </Form.Item>
    </>
  )
}
