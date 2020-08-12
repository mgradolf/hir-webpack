import React from "react"
import { Form, Radio, Select, Input, DatePicker, Divider } from "antd"
import { FormInstance } from "antd/lib/form"
import { Store } from "antd/lib/form/interface"

interface IFormContentsProps {
  formInstance: FormInstance
  onFormSubmission: () => void
  goBackToFirstForm: () => void
}

const layout = {
  labelCol: { span: 6 }
}

export default function CreateForm2(props: IFormContentsProps) {
  return (
    <div>
      <button onClick={props.goBackToFirstForm}>Go Back</button>
      hellow
    </div>
    // <Form hideRequiredMark form={props.formInstance} onValuesChange={props.onChange} initialValues={props.values}>
    //   <Divider orientation="left">Offering</Divider>
    //   <Form.Item label="Offering code" name="offeringCode" {...layout}>
    //     <Input />
    //   </Form.Item>
    //   <Form.Item label="Offering name" name="offeringName" {...layout}>
    //     <Input />
    //   </Form.Item>
    //   <Form.Item label="Description" name="offeringDesc" {...layout}>
    //     <Input.TextArea />
    //   </Form.Item>
    //   <Form.Item label="URL" name="offeringURL" {...layout}>
    //     <Input />
    //   </Form.Item>
    //   <Divider />
    //   <Form.Item name="defineCreation">
    //     <Radio.Group>
    //       <Radio value="byTime">Define creation time</Radio>
    //       <Form.Item name="creationTime" label="Creation Date" {...layout}>
    //         <DatePicker
    //           placeholder="YYYY/MM/DD"
    //           disabled={props.values.defineCreation !== "byTime"}
    //           format="YYYY/MM/DD"
    //         />
    //       </Form.Item>
    //       <Radio value="byTerm">Determined by term</Radio>
    //       <Form.Item label="Select term" name="creationTerm" {...layout}>
    //         <Select disabled={props.values.defineCreation !== "byTerm"} placeholder="Choose a term">
    //           <Select.Option value="TERM_1">Term 1</Select.Option>
    //           <Select.Option value="TERM_2">Term 2</Select.Option>
    //         </Select>
    //       </Form.Item>
    //     </Radio.Group>
    //   </Form.Item>
    //   <Divider />
    //   <Form.Item name="defineTerminationTime" {...layout}>
    //     <Radio.Group>
    //       <Radio value="byTime">Define termination time</Radio>
    //       <Form.Item name="terminationTime" label="Termination Date" {...layout}>
    //         <DatePicker
    //           placeholder="YYYY/MM/DD"
    //           disabled={props.values.defineTerminationTime !== "byTime"}
    //           format="YYYY/MM/DD"
    //         />
    //       </Form.Item>
    //       <Radio value="byDuration">Determined by duration</Radio>
    //       <Form.Item name="terminationDuration" {...layout}>
    //         <Input.Group compact>
    //           <Input placeholder="Year" disabled={props.values.defineTerminationTime !== "byDuration"} />
    //           <Input placeholder="Month" disabled={props.values.defineTerminationTime !== "byDuration"} />
    //           <Input placeholder="Week" disabled={props.values.defineTerminationTime !== "byDuration"} />
    //           <Input placeholder="Day" disabled={props.values.defineTerminationTime !== "byDuration"} />
    //           <Input placeholder="Hour" disabled={props.values.defineTerminationTime !== "byDuration"} />
    //           <Input placeholder="Min" disabled={props.values.defineTerminationTime !== "byDuration"} />
    //         </Input.Group>
    //       </Form.Item>
    //       <Radio value="byTerm">Determined by term</Radio>
    //       <Form.Item label="Select term" name="terminationTerm" {...layout}>
    //         <Select disabled={props.values.defineTerminationTime !== "byTerm"} placeholder="Choose a term">
    //           <Select.Option value="TERM_1">Term 1</Select.Option>
    //           <Select.Option value="TERM_2">Term 2</Select.Option>
    //         </Select>
    //       </Form.Item>
    //     </Radio.Group>
    //   </Form.Item>
    //   <Divider orientation="left">Core characteristics</Divider>
    //   <Form.Item label="Offering status" name="offeringStatus" {...layout}>
    //     <Select>
    //       <Select.Option value="PRELIMINARY">Preliminary</Select.Option>
    //     </Select>
    //   </Form.Item>
    //   <Form.Item label="Department" name="department" {...layout}>
    //     <Select>
    //       <Select.Option value="DEPARTMENT_1">Department 1</Select.Option>
    //     </Select>
    //   </Form.Item>
    //   <Form.Item label="Inquiry recipient" name="recipient" {...layout}>
    //     <Select>
    //       <Select.Option value="NONE">None</Select.Option>
    //     </Select>
    //   </Form.Item>
    //   <Form.Item label="Gateway" name="gateway" {...layout}>
    //     <Select>
    //       <Select.Option value="GATEWAY_1">Gateway 1</Select.Option>
    //     </Select>
    //   </Form.Item>
    //   <Divider orientation="left">Default Section</Divider>
    //   <Form.Item label="Default section type" name="sectionType" {...layout}>
    //     <Select placeholder="Please select a default section type of this offering">
    //       <Select.Option value="SECTION_TYPE_1">Section type 1</Select.Option>
    //     </Select>
    //   </Form.Item>
    // </Form>
  )
}
