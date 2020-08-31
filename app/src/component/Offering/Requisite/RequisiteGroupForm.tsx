import React, { useEffect, useState } from "react"
import { Card, Button, Input, Select, Radio } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingRequisiteGroupFieldNames } from "~/component/Offering/Interfaces"
import { getPolicyTypes } from "~/ApiServices/Service/RefLookupService"

const { TextArea } = Input

interface IOfferingRequisiteGroupFormProps {
  requisiteGroupID?: number
  offeringID: number
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
  onFormSubmission: () => void
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
  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={props.onFormSubmission}>Submit</Button>)

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

  return (
    <Card title="Prerequisite Group Setup" actions={actions}>
      <Form
        initialValues={props.initialFormValue}
        form={props.formInstance}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
      >
        <Form.Item style={{ visibility: "hidden", height: "1px", padding: 0, margin: 0 }} name={fieldNames.OfferingID}>
          <Input value={props.offeringID ? props.offeringID : undefined} />
        </Form.Item>

        <Form.Item
          style={{ visibility: "hidden", height: "1px", padding: 0, margin: 0 }}
          name={fieldNames.RequisiteOfferingGroupID}
        >
          <Input value={props.requisiteGroupID ? props.requisiteGroupID : undefined} />
        </Form.Item>

        <Form.Item
          label="Group Name"
          required
          {...layout}
          name={fieldNames.Name}
          rules={[{ required: true, message: "Please input group name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Policy Name"
          required
          {...layout}
          name={fieldNames.PolicyTypeID}
          rules={[{ required: true, message: "Please select policy name!" }]}
        >
          <Select>
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Information Only"
          required
          {...layout}
          name={fieldNames.IsInformational}
          rules={[{ required: true, message: "Please checked information field!" }]}
        >
          <Radio.Group>
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
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Card>
  )
}
