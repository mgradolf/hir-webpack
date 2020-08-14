import React from "react"
import { Divider, Form, Input } from "antd"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"

interface IOfferingDetails {
  fieldNames: IFieldNames
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}

export default function OfferingDetails(props: IOfferingDetails) {
  return (
    // <Form hideRequiredMark form={props.formInstance} initialValues={props.initialFormValue}>
    <>
      <Divider orientation="left">Offering</Divider>
      <Form.Item label="Offering code" name={props.fieldNames.OfferingCode} {...layout}>
        <Input />
      </Form.Item>
      <Form.Item label="Offering name" name={props.fieldNames.Name} {...layout}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name={props.fieldNames.Description} {...layout}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="URL" name={props.fieldNames.URL} {...layout}>
        <Input />
      </Form.Item>
    </>
    // </Form>
  )
}
