import React from "react"
import { Form, Divider, Select } from "antd"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"

interface IOfferingDefaultSection {
  fieldNames: IFieldNames
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}

export default function OfferingDefaultSection(props: IOfferingDefaultSection) {
  return (
    <Form hideRequiredMark form={props.formInstance} initialValues={props.initialFormValue}>
      <Divider orientation="left">Default Section</Divider>
      <Form.Item label="Default section type" name="sectionType" {...layout}>
        <Select placeholder="Please select a default section type of this offering">
          <Select.Option value="SECTION_TYPE_1">Section type 1</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  )
}
