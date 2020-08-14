import React from "react"
import { Form, Radio, Select, Input, DatePicker, Divider, Card, Button } from "antd"
import { FormInstance } from "antd/lib/form"
import { IFieldNames } from "~/component/Offering/Interfaces"

interface IOfferingCreateForm2Props {
  formInstance: FormInstance
  fieldNames: IFieldNames
  initialFormValue: { [key: string]: any }
  onFormSubmission: () => void
  goBackToFirstForm: () => void
  handleCancel: () => void
}

const layout = {
  labelCol: { span: 6 }
}

export default function CreateForm2(props: IOfferingCreateForm2Props) {
  return (
    <Card
      title="Create Offering"
      actions={[
        <Button onClick={props.goBackToFirstForm}>Go Back</Button>,
        <Button onClick={props.handleCancel}>Cancel</Button>,
        <Button onClick={props.onFormSubmission}>Submit</Button>
      ]}
    >
      <Form
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
        hideRequiredMark
        form={props.formInstance}
        initialValues={props.initialFormValue}
      >
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
        <Divider />
        <Form.Item>
          <Radio.Group>
            <Radio value="byTime">Define creation time</Radio>
            <Form.Item name={props.fieldNames.CreationDate} label="Creation Date" {...layout}>
              <DatePicker
                placeholder="YYYY/MM/DD"
                disabled={!props.formInstance.getFieldValue("byTime")}
                format="YYYY/MM/DD"
              />
            </Form.Item>
            <Radio value="byTerm">Determined by term</Radio>
            <Form.Item label="Select term" name={props.fieldNames.StartTermID} {...layout}>
              <Select disabled={!props.formInstance.getFieldValue("byTerm")} placeholder="Choose a term">
                <Select.Option value="TERM_1">Term 1</Select.Option>
                <Select.Option value="TERM_2">Term 2</Select.Option>
              </Select>
            </Form.Item>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <Form.Item {...layout}>
          <Radio.Group>
            <Radio value="byTime">Define termination time</Radio>
            <Form.Item name={props.fieldNames.TerminationDate} label="Termination Date" {...layout}>
              <DatePicker
                placeholder="YYYY/MM/DD"
                disabled={!props.formInstance.getFieldValue("byTime")}
                format="YYYY/MM/DD"
              />
            </Form.Item>
            <Radio value="byDuration">Determined by duration</Radio>
            <Form.Item name="terminationDuration" {...layout}>
              <Input.Group compact>
                <Input placeholder="Year" disabled={!props.formInstance.getFieldValue("byDuration")} />
                <Input placeholder="Month" disabled={!props.formInstance.getFieldValue("byDuration")} />
                <Input placeholder="Week" disabled={!props.formInstance.getFieldValue("byDuration")} />
                <Input placeholder="Day" disabled={!props.formInstance.getFieldValue("byDuration")} />
                <Input placeholder="Hour" disabled={!props.formInstance.getFieldValue("byDuration")} />
                <Input placeholder="Min" disabled={!props.formInstance.getFieldValue("byDuration")} />
              </Input.Group>
            </Form.Item>
            <Radio value="byTerm">Determined by term</Radio>
            <Form.Item label="Select term" name="terminationTerm" {...layout}>
              <Select disabled={!props.formInstance.getFieldValue("byTerm")} placeholder="Choose a term">
                <Select.Option value="TERM_1">Term 1</Select.Option>
                <Select.Option value="TERM_2">Term 2</Select.Option>
              </Select>
            </Form.Item>
          </Radio.Group>
        </Form.Item>
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
        <Divider orientation="left">Default Section</Divider>
        <Form.Item label="Default section type" name="sectionType" {...layout}>
          <Select placeholder="Please select a default section type of this offering">
            <Select.Option value="SECTION_TYPE_1">Section type 1</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  )
}
