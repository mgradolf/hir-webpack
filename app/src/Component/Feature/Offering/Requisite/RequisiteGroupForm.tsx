import React, { useEffect, useState } from "react"
import { Card, Button, Row, Col } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingRequisiteGroupFieldNames } from "~/Component/Feature/Offering/Interfaces"
import { getPolicyTypes } from "~/ApiServices/Service/RefLookupService"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { updateRequisiteOfferingGroup, createRequisiteOfferingGroup } from "~/ApiServices/Service/OfferingService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"

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

export default function RequisiteGroupForm(props: IOfferingRequisiteGroupFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    props.formInstance.setFieldsValue({ [fieldNames.OfferingID]: props.offeringID })
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
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response)
    }
  }

  return (
    <Card
      title="Prerequisite Group Setup"
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.handleCancel}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onFormSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Form initialValues={props.initialFormValue} form={props.formInstance} className="modal-form">
        <OldFormError errorMessages={errorMessages}></OldFormError>

        <FormInput
          label={"OfferingID"}
          fieldName={fieldNames.OfferingID}
          formInstance={props.formInstance}
          defaultValue={props.offeringID}
          hidden
        />

        <FormInput
          label={"RequisiteOfferingGroupID"}
          fieldName={fieldNames.RequisiteOfferingGroupID}
          formInstance={props.formInstance}
          defaultValue={props.requisiteGroupID}
          hidden
        />

        <FormInput
          labelColSpan={6}
          wrapperColSpan={12}
          label={"Group Name"}
          fieldName={fieldNames.Name}
          formInstance={props.formInstance}
          rules={[{ required: true, message: "Please input group name!" }]}
        />

        <FormDropDown
          labelColSpan={6}
          wrapperColSpan={12}
          label={"Policy Name"}
          ariaLabel={"Policy Select"}
          formInstance={props.formInstance}
          fieldName={fieldNames.PolicyTypeID}
          refLookupService={getPolicyTypes}
          displayKey="Name"
          valueKey="ID"
          rules={[
            {
              required: true,
              message: "Please select policy name!"
            }
          ]}
        />

        <FormInput
          labelColSpan={6}
          wrapperColSpan={12}
          label={"Policy Value"}
          fieldName={fieldNames.PolicyValue}
          formInstance={props.formInstance}
          rules={[{ required: true, message: "Please input policy value!" }]}
        />

        <FormMultipleRadio
          labelColSpan={6}
          wrapperColSpan={12}
          formInstance={props.formInstance}
          label={"Information Only"}
          fieldName={fieldNames.IsInformational}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
          rules={[{ required: true, message: "Please checked information field!" }]}
        />

        <FormTextArea
          labelColSpan={6}
          wrapperColSpan={12}
          label={"Quick Admit Narrative"}
          fieldName={fieldNames.CatalogNarrative}
          formInstance={props.formInstance}
          rules={[
            {
              required: true,
              message: "Please input narrative description!"
            }
          ]}
        />
      </Form>
    </Card>
  )
}
