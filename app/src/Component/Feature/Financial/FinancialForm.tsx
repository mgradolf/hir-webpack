import React, { useEffect, useState } from "react"
import { Form, Card, Button, Select, Row, Col } from "antd"
import {
  getGLAccountTypes,
  getFinancialCategoryType,
  getFinancialBasisType,
  getFinancialType
} from "~/ApiServices/Service/RefLookupService"
import "~/Sass/utils.scss"
import { createFinancial, updateFinancial } from "~/ApiServices/Service/FinancialService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import {
  eventBus,
  REFRESH_FACULTY_OFFERINGS_TAB,
  REFRESH_MAREKTING_PROGRAM_OFFERINGS_TAB,
  REFRESH_OFFERING_FINANCIAL_PAGE,
  REFRESH_RESOURCE_OFFERINGS_TAB
} from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { FINANCIAL_BASIS_TYPE_PER_UNIT_ID, FINANCIAL_TYPE_FACULTY } from "~/utils/Constants"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInputNumber } from "~/Component/Common/Form/FormInputNumber"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"

interface ICreateFormProps {
  applyToID: number
  financialType: string
  financialID?: number
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}
export default function FinancialForm(props: ICreateFormProps) {
  const [financialBasisTypes, setFinancialBasisTypes] = useState<Array<any>>([])
  const [financialTypeId, setfinancialTypeId] = useState(1)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    props.formInstance.setFieldsValue({ [props.fieldNames.ApplyToID]: props.applyToID })
    props.formInstance.setFieldsValue({ [props.fieldNames.FinancialTypeID]: financialTypeId })
    ;(async () => {
      const response = await getFinancialBasisType()
      if (response && response.success && response.data) {
        if (props.financialType === FINANCIAL_TYPE_FACULTY) {
          response.data = response.data.filter((x: any) => x.ID === FINANCIAL_BASIS_TYPE_PER_UNIT_ID)
        }
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
      eventBus.publish(REFRESH_OFFERING_FINANCIAL_PAGE)
      eventBus.publish(REFRESH_FACULTY_OFFERINGS_TAB)
      eventBus.publish(REFRESH_MAREKTING_PROGRAM_OFFERINGS_TAB)
      eventBus.publish(REFRESH_RESOURCE_OFFERINGS_TAB)
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
        props.financialID ? `Edit ${props.financialType} Financial` : `Create New ${props.financialType} Financial`
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
          defaultValue={props.financialID}
          hidden
        />

        <FormInput
          label={"FinancialTypeID"}
          fieldName={props.fieldNames.FinancialTypeID}
          formInstance={props.formInstance}
          defaultValue={financialTypeId}
          hidden
        />

        <FormInput
          label={"OfferingID"}
          fieldName={props.fieldNames.ApplyToID}
          formInstance={props.formInstance}
          defaultValue={props.applyToID}
          hidden
        />

        <FormDropDown
          labelColSpan={6}
          wrapperColSpan={12}
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
          {...layout}
          name={props.fieldNames.FinancialBasisTypeID}
          rules={[
            {
              required: true,
              message: "Please select financial basis type!"
            }
          ]}
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
          labelColSpan={6}
          wrapperColSpan={12}
          label={"Description"}
          fieldName={props.fieldNames.Description}
          formInstance={props.formInstance}
          rules={[
            {
              required: true,
              message: "Please enter description!"
            }
          ]}
        />

        <FormDropDown
          labelColSpan={6}
          wrapperColSpan={12}
          label={"GL Accounts"}
          ariaLabel={"GL Accounts Select"}
          formInstance={props.formInstance}
          fieldName={props.fieldNames.GLAccountID}
          refLookupService={getGLAccountTypes}
          displayKey="Name"
          valueKey="ID"
        />

        <FormInputNumber
          labelColSpan={6}
          wrapperColSpan={12}
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
          labelColSpan={6}
          wrapperColSpan={12}
          formInstance={props.formInstance}
          label={"Type"}
          ariaLabel={"Is Type"}
          fieldName={props.fieldNames.IsCharge}
          options={[
            { label: "Income", value: true },
            { label: "Expense", value: false }
          ]}
          disabled={props.initialFormValue.IsCharge !== undefined}
        />

        {/* <Form.Item name={props.fieldNames.IsOptional} label="Item is Optional" {...layout} valuePropName="checked">
          <Switch
            aria-label="Is Item Optional"
            defaultChecked={props.formInstance.getFieldValue(props.fieldNames.IsOptional)}
          />
        </Form.Item>
        <Form.Item name={props.fieldNames.IsTaxable} label="Taxable" {...layout} valuePropName="checked">
          <Switch
            aria-label="Is Taxable"
            defaultChecked={props.formInstance.getFieldValue(props.fieldNames.IsTaxable)}
          />
        </Form.Item> */}

        <FormMultipleRadio
          labelColSpan={6}
          wrapperColSpan={12}
          formInstance={props.formInstance}
          label={"Active"}
          ariaLabel={"Is Active"}
          fieldName={props.fieldNames.IsActive}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />

        {/* <Form.Item label="Weight" {...layout} name={props.fieldNames.Weight}>
          <Input aria-label="Weight" type="number" min={0} />
        </Form.Item> */}
      </Form>
    </Card>
  )
}
