import React from "react"
import { Divider, Form, Input } from "antd"
import { IOfferingFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"

interface IOfferingDetails {
  fieldNames: IOfferingFieldNames
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
      <Form.Item
        label="Offering code *"
        name={props.fieldNames.OfferingCode}
        {...layout}
        rules={[
          {
            required: true,
            message: "Please input Offering Code"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Offering name *"
        name={props.fieldNames.Name}
        {...layout}
        rules={[
          {
            required: true,
            message: "Please input Offering Name"
          }
        ]}
      >
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
