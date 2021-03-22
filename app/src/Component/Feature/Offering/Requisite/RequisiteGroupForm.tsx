import React, { useEffect, useState } from "react"
import { Card, Button, Input, Select, Radio } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingRequisiteGroupFieldNames } from "~/Component/Offering/Interfaces"
import { getPolicyTypes } from "~/ApiServices/Service/RefLookupService"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { updateRequisiteOfferingGroup, createRequisiteOfferingGroup } from "~/ApiServices/Service/OfferingService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"

const { TextArea } = Input

interface IOfferingRequisiteGroupFormProps {
  requisiteGroupID?: number
  offeringID: number
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
  setApiCallInProgress: (flag: boolean) => void
  handleCancel: () => void
}

const fieldNames: IOfferingRequisiteGroupFieldNames = {
  OfferingID: "OfferingID",
  PolicyTypeID: "PolicyTypeID",
  PolicyValue: "PolicyValue",
  Name: "Name",
  IsInformational: "IsInformational",
  CatalogNarrative: "CatalogNarrative",
  RequisiteOfferingGroupID: "RequisiteOfferingGroupID"
}

const layout = {
  labelCol: { span: 6 }
}

export default function RequisiteGroupForm(props: IOfferingRequisiteGroupFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [offeringGroupPolicyTypeList, setOfferingGroupPolicyTypeList] = useState<Array<any>>([])

  useEffect(() => {
    props.formInstance.setFieldsValue({ [fieldNames.OfferingID]: props.offeringID })
    ;(async () => {
      const response = await getPolicyTypes()
      if (response && response.success && response.data) {
        setOfferingGroupPolicyTypeList(response.data)
      }
    })()
  }, [props.formInstance, props.offeringID])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = props.requisiteGroupID
      ? updateRequisiteOfferingGroup
      : createRequisiteOfferingGroup

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response)
    }
  }

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title="Prerequisite Group Setup" actions={actions}>
      <Form initialValues={props.initialFormValue} form={props.formInstance} className="modal-form">
        <OldFormError
          errorMessages={errorMessages}
          genericInstructions={
            <ul>
              <li>
                All fields marked with an asterisk (<span style={{ color: "red" }}>*</span>) are required.
              </li>
            </ul>
          }
        ></OldFormError>
        <Form.Item style={{ visibility: "hidden", height: "1px", padding: 0, margin: 0 }} name={fieldNames.OfferingID}>
          <Input aria-label="Offering ID" value={props.offeringID ? props.offeringID : undefined} />
        </Form.Item>

        <Form.Item
          style={{ visibility: "hidden", height: "1px", padding: 0, margin: 0 }}
          name={fieldNames.RequisiteOfferingGroupID}
        >
          <Input aria-label="Requisite Group ID" value={props.requisiteGroupID ? props.requisiteGroupID : undefined} />
        </Form.Item>

        <Form.Item
          label="Group Name"
          required
          {...layout}
          name={fieldNames.Name}
          rules={[{ required: true, message: "Please input group name!" }]}
        >
          <Input aria-label="Group Name" />
        </Form.Item>

        <Form.Item
          label="Policy Name"
          required
          {...layout}
          name={fieldNames.PolicyTypeID}
          rules={[{ required: true, message: "Please select policy name!" }]}
        >
          <Select aria-label="Policy Name Select">
            {offeringGroupPolicyTypeList.map((x) => {
              return (
                <Select.Option key={x.ID} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Policy Value"
          required
          {...layout}
          name={fieldNames.PolicyValue}
          rules={[{ required: true, message: "Please input policy name!" }]}
        >
          <Input aria-label="Policy Value" />
        </Form.Item>

        <Form.Item
          label="Information Only"
          required
          {...layout}
          name={fieldNames.IsInformational}
          rules={[{ required: true, message: "Please checked information field!" }]}
        >
          <Radio.Group aria-label="Information Only">
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Quick Admit Narrative"
          required
          {...layout}
          name={fieldNames.CatalogNarrative}
          rules={[{ required: true, message: "Please input narrative description!" }]}
        >
          <TextArea rows={4} aria-label="Quick Admit Narrative" />
        </Form.Item>
      </Form>
    </Card>
  )
}
