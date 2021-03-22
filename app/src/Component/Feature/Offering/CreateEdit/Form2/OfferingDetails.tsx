import React from "react"
import { Divider, Form, Input } from "antd"
import { IOfferingFieldNames } from "~/Component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"

interface IOfferingDetails {
  fieldNames: IOfferingFieldNames
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 6 }
}

export default function OfferingDetails(props: IOfferingDetails) {
  return (
    <>
      <Divider orientation="left">Offering</Divider>
      <Form.Item
        label="Offering code"
        name={props.fieldNames.OfferingCode}
        {...layout}
        rules={[
          {
            required: true,
            message: "Please input Offering Code"
          }
        ]}
      >
        <Input aria-label="Offering Code" />
      </Form.Item>
      <Form.Item
        label="Offering name"
        name={props.fieldNames.Name}
        {...layout}
        rules={[
          {
            required: true,
            message: "Please input Offering Name"
          }
        ]}
      >
        <Input aria-label="Offering Name" />
      </Form.Item>
      <Form.Item label="Description" name={props.fieldNames.Description} {...layout}>
        <Input.TextArea aria-label="Description" />
      </Form.Item>
      <Form.Item label="URL" name={props.fieldNames.URL} {...layout}>
        <Input aria-label="URL" />
      </Form.Item>
    </>
  )
}
