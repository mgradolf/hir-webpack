import React from "react"
import { Form, Divider, Select } from "antd"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"

interface IOfferingCoreChar {
  fieldNames: IFieldNames
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}

export default function OfferingCoreChar(props: IOfferingCoreChar) {
  return (
    <Form hideRequiredMark form={props.formInstance} initialValues={props.initialFormValue}>
      <Divider orientation="left">Core characteristics</Divider>
      <Form.Item label="Offering status" name="offeringStatus" {...layout}>
        <Select>
          <Select.Option value="PRELIMINARY">Preliminary</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Department" name="department" {...layout}>
        <Select>
          <Select.Option value="DEPARTMENT_1">Department 1</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Inquiry recipient" name="recipient" {...layout}>
        <Select>
          <Select.Option value="NONE">None</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Gateway" name="gateway" {...layout}>
        <Select>
          <Select.Option value="GATEWAY_1">Gateway 1</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )
}
