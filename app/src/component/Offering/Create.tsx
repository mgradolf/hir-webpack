import * as React from "react"
import { Modal, Form, Radio, Select, Input, Typography, DatePicker, Divider } from "antd"
import { Store } from "antd/lib/form/interface"
import { FormInstance } from "antd/lib/form"

const { TextArea } = Input
const { Option } = Select

interface ICreateNewOffering {
  visible: boolean
  onClose: (flag: boolean) => void
}

interface IFormContentsProps {
  formInstance: FormInstance
  activePage: number
  values: {
    [key: string]: string | number | boolean | null
  }
  onChange: (values: Store) => void
}

const layout = {
  labelCol: { span: 6 }
}

const radioStyle = { display: "block", height: "30px", lineHeight: "30px" }
const groupInputStyle = { width: "16.67%" }

function FormContents({ activePage, values, onChange, formInstance }: IFormContentsProps) {
  const contents = [
    () => (
      <Form form={formInstance} hideRequiredMark layout="vertical" onValuesChange={onChange} initialValues={values}>
        <Form.Item
          label="Please select an offering type to create"
          name="offeringType"
          rules={[{ required: true, message: "Please input an offering type!" }]}
        >
          <Radio.Group>
            {[
              { label: "Create default offering type", value: "DEFAULT" },
              { label: "Select other offering type", value: "OTHER" }
            ].map((opt, index) => (
              <Radio style={radioStyle} value={opt.value} key={index}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Other offering types"
          name="otherOfferingType"
          dependencies={["offeringType"]}
          rules={[{ required: true, message: "Please select an offering type!" }]}
        >
          <Select placeholder="Select an offering type" disabled={values.offeringType !== "OTHER"}>
            <Option value="OFFERING_TYPE_1">Offering type 1</Option>
            <Option value="OFFERING_TYPE_2">Offering type 2</Option>
          </Select>
        </Form.Item>
      </Form>
    ),
    () => (
      <Form hideRequiredMark form={formInstance} onValuesChange={onChange} initialValues={values}>
        <Divider orientation="left">Offering</Divider>
        <Form.Item label="Offering code" name="offeringCode" {...layout}>
          <Input />
        </Form.Item>
        <Form.Item label="Offering name" name="offeringName" {...layout}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="offeringDesc" {...layout}>
          <TextArea />
        </Form.Item>
        <Form.Item label="URL" name="offeringURL" {...layout}>
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item name="defineCreation">
          <Radio.Group>
            <Radio value="byTime" style={radioStyle}>
              Define creation time
            </Radio>
            <Form.Item name="creationTime" label="Creation Date" {...layout}>
              <DatePicker placeholder="YYYY/MM/DD" disabled={values.defineCreation !== "byTime"} format="YYYY/MM/DD" />
            </Form.Item>
            <Radio value="byTerm" style={radioStyle}>
              Determined by term
            </Radio>
            <Form.Item label="Select term" name="creationTerm" {...layout}>
              <Select disabled={values.defineCreation !== "byTerm"} placeholder="Choose a term">
                <Option value="TERM_1">Term 1</Option>
                <Option value="TERM_2">Term 2</Option>
              </Select>
            </Form.Item>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <Form.Item name="defineTerminationTime" {...layout}>
          <Radio.Group>
            <Radio value="byTime" style={radioStyle}>
              Define termination time
            </Radio>
            <Form.Item name="terminationTime" label="Termination Date" {...layout}>
              <DatePicker
                placeholder="YYYY/MM/DD"
                disabled={values.defineTerminationTime !== "byTime"}
                format="YYYY/MM/DD"
              />
            </Form.Item>
            <Radio value="byDuration" style={radioStyle}>
              Determined by duration
            </Radio>
            <Form.Item name="terminationDuration" {...layout}>
              <Input.Group compact>
                <Input
                  style={groupInputStyle}
                  placeholder="Year"
                  disabled={values.defineTerminationTime !== "byDuration"}
                />
                <Input
                  style={groupInputStyle}
                  placeholder="Month"
                  disabled={values.defineTerminationTime !== "byDuration"}
                />
                <Input
                  style={groupInputStyle}
                  placeholder="Week"
                  disabled={values.defineTerminationTime !== "byDuration"}
                />
                <Input
                  style={groupInputStyle}
                  placeholder="Day"
                  disabled={values.defineTerminationTime !== "byDuration"}
                />
                <Input
                  style={groupInputStyle}
                  placeholder="Hour"
                  disabled={values.defineTerminationTime !== "byDuration"}
                />
                <Input
                  style={groupInputStyle}
                  placeholder="Min"
                  disabled={values.defineTerminationTime !== "byDuration"}
                />
              </Input.Group>
            </Form.Item>
            <Radio value="byTerm" style={radioStyle}>
              Determined by term
            </Radio>
            <Form.Item label="Select term" name="terminationTerm" {...layout}>
              <Select disabled={values.defineTerminationTime !== "byTerm"} placeholder="Choose a term">
                <Option value="TERM_1">Term 1</Option>
                <Option value="TERM_2">Term 2</Option>
              </Select>
            </Form.Item>
          </Radio.Group>
        </Form.Item>
        <Divider orientation="left">Core characteristics</Divider>
        <Form.Item label="Offering status" name="offeringStatus" {...layout}>
          <Select>
            <Option value="PRELIMINARY">Preliminary</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Department" name="department" {...layout}>
          <Select>
            <Option value="DEPARTMENT_1">Department 1</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Inquiry recipient" name="recipient" {...layout}>
          <Select>
            <Option value="NONE">None</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Gateway" name="gateway" {...layout}>
          <Select>
            <Option value="GATEWAY_1">Gateway 1</Option>
          </Select>
        </Form.Item>
        <Divider orientation="left">Default Section</Divider>
        <Form.Item label="Default section type" name="sectionType" {...layout}>
          <Select placeholder="Please select a default section type of this offering">
            <Option value="SECTION_TYPE_1">Section type 1</Option>
          </Select>
        </Form.Item>
      </Form>
    )
  ]
  return contents[activePage]()
}
export default function CreateNewOffering(props: ICreateNewOffering) {
  const { visible } = props
  const [values, setValues] = React.useState<Array<{ [key: string]: any }>>([
    { offeringType: "DEFAULT" },
    { offeringCode: "", offeringName: "" }
  ])
  const [activePage, setActivePage] = React.useState(0)
  const [formInstance] = Form.useForm()

  const handleOk = () => {
    if (activePage < values.length - 1) {
      setActivePage(activePage + 1)
    }
  }
  const handleCancel = () => {
    console.log("meo mo")
    props.onClose(false)
  }

  return (
    <Modal
      title="Create offering"
      visible={visible}
      okText="Create"
      bodyStyle={{ maxHeight: "60vh", overflow: "auto" }}
      onOk={() => {
        formInstance.validateFields().then(() => handleOk())
      }}
      onCancel={handleCancel}
    >
      <FormContents
        formInstance={formInstance}
        activePage={activePage}
        values={values[activePage]}
        onChange={(newValues) => {
          const prevPageValues = values.slice(0, activePage)
          const activePageValues = values[activePage]
          const nextPageValues = values.slice(activePage + 1)
          setValues([...prevPageValues, { ...activePageValues, ...newValues }, ...nextPageValues])
        }}
      />
    </Modal>
  )
}
