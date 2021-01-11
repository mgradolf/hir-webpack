import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Radio, Switch } from "antd"
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
import FormError from "~/Component/Common/FormError"

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
  labelCol: { span: 6 }
}
export default function FinancialForm(props: ICreateFormProps) {
  const [financialCategoryTypes, setFinancialCategoryTypes] = useState<Array<any>>([])
  const [financialBasisTypes, setFinancialBasisTypes] = useState<Array<any>>([])
  const [glAccountTypes, setGlAccountTypes] = useState<Array<any>>([])
  const [financialTypeId, setfinancialTypeId] = useState(1)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    props.formInstance.setFieldsValue({ [props.fieldNames.ApplyToID]: props.applyToID })
    props.formInstance.setFieldsValue({ [props.fieldNames.FinancialTypeID]: financialTypeId })
    ;(async () => {
      const response = await getFinancialCategoryType()
      if (response && response.success && response.data) {
        setFinancialCategoryTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getFinancialBasisType()
      if (response && response.success && response.data) {
        setFinancialBasisTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getGLAccountTypes()
      if (response && response.success && response.data) {
        setGlAccountTypes(response.data)
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

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title={props.financialID ? `Edit Offering financial` : "Create new offering financial"} actions={actions}>
      <Form form={props.formInstance} initialValues={props.initialFormValue} className="modal-form">
        <FormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.FinancialID}>
          <Input aria-label="Financial ID" value={props.financialID ? props.financialID : undefined} />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.FinancialTypeID}>
          <Input aria-label="Financial Type" value={financialTypeId} />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.ApplyToID}>
          <Input aria-label="Offering ID" value={props.applyToID} />
        </Form.Item>

        <Form.Item label="Category" name={props.fieldNames.FinancialCategoryTypeID} {...layout}>
          <Select aria-label="Category Select">
            {financialCategoryTypes.map((x) => {
              return (
                <Select.Option key={x.ID + x.Name} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Basis" {...layout} name={props.fieldNames.FinancialBasisTypeID}>
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

        <Form.Item label="Description" {...layout} name={props.fieldNames.Description}>
          <Input aria-label="Description" />
        </Form.Item>

        <Form.Item label="GL Accounts" {...layout} name={props.fieldNames.GLAccountID}>
          <Select aria-label="GL Accounts">
            {glAccountTypes.map((x) => {
              return <Select.Option key={x.ID + x.Name} value={x.ID}>{`${x.Name} (${x.Description})`}</Select.Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Amount" {...layout} name={props.fieldNames.ItemUnitAmount}>
          <Input aria-label="Amount" type="number" min={0} max={999999} />
        </Form.Item>

        <Form.Item label="Type" {...layout} name={props.fieldNames.IsCharge}>
          <Radio.Group aria-label="Type">
            <Radio value={true}>Income</Radio>
            <Radio value={false}>Expense</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name={props.fieldNames.IsOptional} label="Item is Optional" {...layout} valuePropName="checked">
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
        </Form.Item>
        <Form.Item name={props.fieldNames.IsActive} label="Active" {...layout} valuePropName="checked">
          <Switch aria-label="Is Active" defaultChecked={props.formInstance.getFieldValue(props.fieldNames.IsActive)} />
        </Form.Item>

        <Form.Item label="Weight" {...layout} name={props.fieldNames.Weight}>
          <Input aria-label="Weight" type="number" min={0} />
        </Form.Item>
      </Form>
    </Card>
  )
}
