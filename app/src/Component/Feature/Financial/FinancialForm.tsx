import React, { useEffect, useState } from "react"
import { Form, Card, Button, Select, Row, Col, Divider, message } from "antd"
import {
  getGLAccountTypes,
  getFinancialCategoryType,
  getFinancialBasisType,
  getFinancialType
} from "~/ApiServices/Service/RefLookupService"
import "~/Sass/utils.scss"
import { createFinancial, updateFinancial } from "~/ApiServices/Service/FinancialService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import {
  ADDED_SUCCESSFULLY,
  FINANCIAL_TYPE_FACULTY,
  FINANCIAL_TYPE_MARKETING_PROGRAM,
  UPDATE_SUCCESSFULLY
} from "~/utils/Constants"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInputNumber } from "~/Component/Common/Form/FormInputNumber"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface ICreateFormProps {
  applyToID: number
  financialType: string
  helpkey?: string
  financialID?: number
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function FinancialForm(props: ICreateFormProps) {
  const [financialBasisTypes, setFinancialBasisTypes] = useState<Array<any>>([])
  const [financialTypeId, setfinancialTypeId] = useState(1)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    props.formInstance.setFieldsValue({ [props.fieldNames.ApplyToID]: props.applyToID })
    props.formInstance.setFieldsValue({ [props.fieldNames.FinancialTypeID]: financialTypeId })
    if (props.financialID) {
      props.formInstance.setFieldsValue({ [props.fieldNames.FinancialID]: props.financialID })
    }
    ;(async () => {
      const response = await getFinancialBasisType()
      if (response && response.success && response.data) {
        setFinancialBasisTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getFinancialType()
      if (response && response.success && response.data && Array.isArray(response.data)) {
        setfinancialTypeId(response.data.find((x: any) => x.Name === props.financialType).ID)
      }
    })()
  }, [props, financialTypeId])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = props.financialID ? updateFinancial : createFinancial

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      if (props.financialID) {
        message.success(UPDATE_SUCCESSFULLY)
      } else {
        message.success(ADDED_SUCCESSFULLY)
      }
      eventBus.publish(REFRESH_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>
            {props.financialID
              ? `Edit ${props.financialType} Financial`
              : `Create New ${props.financialType} Financial`}
          </Col>
          <Col>
            <HelpButton helpKey={props.helpkey} />
          </Col>
        </Row>
      }
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
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        scrollToFirstError
        style={{
          maxHeight: "80vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages} />
        <FormInput
          label={"FinancialID"}
          fieldName={props.fieldNames.FinancialID}
          formInstance={props.formInstance}
          hidden
        />
        <FormInput
          label={"FinancialTypeID"}
          fieldName={props.fieldNames.FinancialTypeID}
          formInstance={props.formInstance}
          hidden
        />
        <FormInput
          label={"OfferingID"}
          fieldName={props.fieldNames.ApplyToID}
          formInstance={props.formInstance}
          hidden
        />

        <FormDropDown
          {...layout}
          label={"Category"}
          ariaLabel={"Category Select"}
          formInstance={props.formInstance}
          fieldName={props.fieldNames.FinancialCategoryTypeID}
          refLookupService={getFinancialCategoryType}
          displayKey="Name"
          valueKey="ID"
          rules={[
            {
              required: true,
              message: "Please select category type!"
            }
          ]}
        />
        <Form.Item
          label="Basis"
          colon={false}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          name={props.fieldNames.FinancialBasisTypeID}
          rules={[
            {
              required: true,
              message: "Please select financial basis type!"
            }
          ]}
          hidden={props.financialType === FINANCIAL_TYPE_FACULTY}
        >
          <Select aria-label="Basis Select">
            {financialBasisTypes.map((x) => {
              return (
                <Select.Option key={x.ID + x.Name} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <FormTextArea
          {...layout}
          label={"Description"}
          fieldName={props.fieldNames.Description}
          formInstance={props.formInstance}
          maxLength={255}
          rules={[
            {
              required: true,
              message: "Please enter description!"
            }
          ]}
        />
        <FormDropDown
          {...layout}
          label={"GL Accounts"}
          ariaLabel={"GL Accounts Select"}
          formInstance={props.formInstance}
          fieldName={props.fieldNames.GLAccountID}
          refLookupService={getGLAccountTypes}
          displayKey="Name"
          valueKey="ID"
        />

        <Divider orientation="left"></Divider>
        <Row>
          <Col xs={24} sm={24} md={12}>
            <FormInputNumber
              {...layout}
              label={"Amount"}
              fieldName={props.fieldNames.ItemUnitAmount}
              formInstance={props.formInstance}
              rules={[
                {
                  required: true,
                  message: "Please enter an amount!"
                }
              ]}
            />
            <FormMultipleRadio
              {...layout}
              formInstance={props.formInstance}
              label={"Type"}
              ariaLabel={"Is Type"}
              fieldName={props.fieldNames.IsCharge}
              options={[
                { label: "Income", value: true },
                { label: "Expense", value: false }
              ]}
              hidden={
                props.financialType === FINANCIAL_TYPE_MARKETING_PROGRAM ||
                props.financialType === FINANCIAL_TYPE_FACULTY
              }
            />
            <FormNumberInput
              {...layout}
              label={"Weight"}
              fieldName={props.fieldNames.Weight}
              formInstance={props.formInstance}
              hidden={
                props.financialType === FINANCIAL_TYPE_MARKETING_PROGRAM ||
                props.financialType === FINANCIAL_TYPE_FACULTY
              }
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <FormMultipleRadio
              {...layout}
              formInstance={props.formInstance}
              label={"Is Item Optional"}
              ariaLabel={"Is Item Optional"}
              fieldName={props.fieldNames.IsOptional}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false }
              ]}
              hidden={
                props.financialType === FINANCIAL_TYPE_MARKETING_PROGRAM ||
                props.financialType === FINANCIAL_TYPE_FACULTY
              }
            />
            <FormMultipleRadio
              {...layout}
              formInstance={props.formInstance}
              label={"Is Taxable"}
              ariaLabel={"Is Taxable"}
              fieldName={props.fieldNames.IsTaxable}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false }
              ]}
              hidden={
                props.financialType === FINANCIAL_TYPE_MARKETING_PROGRAM ||
                props.financialType === FINANCIAL_TYPE_FACULTY
              }
            />
            <FormMultipleRadio
              {...layout}
              formInstance={props.formInstance}
              label={"Active"}
              ariaLabel={"Is Active"}
              fieldName={props.fieldNames.IsActive}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false }
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
