import React, { useEffect, useState } from "react"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Button, Card, Checkbox, Form, Input, Select } from "antd"
import { FormInstance } from "antd/lib/form"
import FormError from "~/Component/Common/FormError"
import { getOrganizations, getPreferenceValueType } from "~/ApiServices/Service/RefLookupService"
import TextArea from "antd/lib/input/TextArea"
import QuestionSelectionOptionForm from "~/Component/Question/Create/QuestionSelectionOptionForm"

interface IQuestionCreateForm {
  formInstance: FormInstance
  errorMessages: Array<ISimplifiedApiErrorMessage>
  setErrorMessages: (messages: Array<ISimplifiedApiErrorMessage>) => void
  handleCancel?: () => void
  onFormSubmission: (Params: any) => void
}

interface IFieldName {
  PreferenceValueTypeID: string
  Description: string
  OrganizationID: string
  Name: string
  IsActive: string
}

const fieldNames: IFieldName = {
  PreferenceValueTypeID: "PreferenceValueTypeID",
  Description: "Description",
  OrganizationID: "OrganizationID",
  Name: "Name",
  IsActive: "IsActive"
}

const layout = {
  labelCol: { span: 6 }
}

export default function QuestionCreateForm(props: IQuestionCreateForm) {
  const [allOrganizations, setAllOrganizations] = useState<Array<any>>([])
  const [allPreferanceValueType, setAllPreferanceValueType] = useState<Array<any>>([])
  const [showSelectionOption, setShowSelectionOption] = useState(false)
  const [fixedOptions, setFixedOptions] = useState<Array<any>>([])

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(
    <Button
      onClick={() => {
        props.onFormSubmission({
          ...props.formInstance.getFieldsValue(),
          FixedOptions: fixedOptions
        })
      }}
    >
      Submit
    </Button>
  )

  useEffect(() => {
    getOrganizations().then((x) => {
      if (x.success) setAllOrganizations(x.data)
    })
    getPreferenceValueType().then((x) => {
      if (x.success) setAllPreferanceValueType(x.data)
    })
  }, [])

  return (
    <Card title="Create Question" actions={actions}>
      <Form form={props.formInstance} className="modal-form">
        <FormError
          errorMessages={props.errorMessages}
          genericInstructions={
            <ul>
              <li>
                All fields marked with an asterisk (<span style={{ color: "red" }}>*</span>) are required.
              </li>
            </ul>
          }
        ></FormError>
        <Form.Item label="Organization" name={fieldNames.OrganizationID} {...layout}>
          <Select aria-label="Organization">
            {allOrganizations.map((x, i) => (
              <Select.Option key={i} value={x.ID}>
                {x.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Widget Type" name={fieldNames.PreferenceValueTypeID} {...layout}>
          <Select
            aria-label="Widget Type"
            onChange={(id: number) => {
              if (id === 1) setShowSelectionOption(true)
              else setShowSelectionOption(false)
            }}
          >
            {allPreferanceValueType.map((x, i) => (
              <Select.Option key={i + 1000} value={x.ID}>
                {x.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Question" name={fieldNames.Name} {...layout}>
          <Input />
        </Form.Item>
        <Form.Item label="Display As" name={fieldNames.Description} {...layout}>
          <TextArea />
        </Form.Item>
        <Form.Item label="Active" name={fieldNames.IsActive} valuePropName="checked" {...layout}>
          <Checkbox />
        </Form.Item>
        {showSelectionOption && <QuestionSelectionOptionForm setFixedOptions={setFixedOptions} />}
      </Form>
    </Card>
  )
}
