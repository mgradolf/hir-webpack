import React, { useEffect, useState } from "react"
import { Card, Button, Input, Select, Radio } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingFinancialFieldNames } from "~/component/Offering/Interfaces"
import {
  getGLAccountTypes,
  getFinancialCategoryType,
  getFinancialBasisType,
  getFinancialType
} from "~/ApiServices/Service/RefLookupService"

interface IOfferingCreateForm2Props {
  offeringID: number
  financialID?: number
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
  onFormSubmission: () => void
  handleCancel: () => void
}

const fieldNames: IOfferingFinancialFieldNames = {
  IsCharge: "IsCharge",
  FinancialBasisTypeID: "FinancialBasisTypeID",
  Description: "Description",
  ItemUnitAmount: "ItemUnitAmount",
  GLAccountID: "GLAccountID",
  IsActive: "IsActive",
  FinancialTypeID: "FinancialTypeID",
  oca: "oca",
  Weight: "Weight",
  FinancialID: "FinancialID",
  IsOptional: "IsOptional",
  FinancialCategoryTypeID: "FinancialCategoryTypeID",
  ApplyToID: "ApplyToID",
  IsTaxable: "IsTaxable"
}
const layout = {
  labelCol: { span: 6 }
}
export default function FinancialForm(props: IOfferingCreateForm2Props) {
  const actions = []
  actions.push(
    <Button
      onClick={() => {
        console.log(props.formInstance.getFieldsValue())
        console.log(props)
        console.log(financialTypeId)
      }}
    >
      Cancel
    </Button>
  )
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={props.onFormSubmission}>Submit</Button>)

  const [financialCategoryTypes, setFinancialCategoryTypes] = useState<Array<any>>([])
  const [financialBasisTypes, setFinancialBasisTypes] = useState<Array<any>>([])
  const [glAccountTypes, setGlAccountTypes] = useState<Array<any>>([])
  const [financialTypeId, setfinancialTypeId] = useState(1)

  useEffect(() => {
    console.log("calling use effect")
    props.formInstance.setFieldsValue({ [fieldNames.ApplyToID]: props.offeringID })
    props.formInstance.setFieldsValue({ [fieldNames.FinancialTypeID]: financialTypeId })
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
        setfinancialTypeId(response.data.find((x) => x.Name === "Offering").ID)
      }
    })()
  }, [props, financialTypeId])
  return (
    <Card
      title={
        props.initialFormValue && props.initialFormValue.Name
          ? `Edit '${props.initialFormValue.Name}' Offering financial`
          : "Create new offering financial"
      }
      actions={actions}
    >
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
      >
        <Form.Item style={{ visibility: "hidden", height: "1px", padding: 0, margin: 0 }} name={fieldNames.FinancialID}>
          <Input value={props.financialID ? props.financialID : undefined} />
        </Form.Item>

        <Form.Item
          style={{ visibility: "hidden", height: "1px", padding: 0, margin: 0 }}
          name={fieldNames.FinancialTypeID}
        >
          <Input value={financialTypeId} />
        </Form.Item>

        <Form.Item style={{ visibility: "hidden", height: "1px", padding: 0, margin: 0 }} name={fieldNames.ApplyToID}>
          <Input value={props.offeringID} />
        </Form.Item>

        <Form.Item label="Category" name={fieldNames.FinancialCategoryTypeID} {...layout}>
          <Select>
            {financialCategoryTypes.map((x) => {
              return (
                <Select.Option key={x.ID + x.Name} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Basis" {...layout} name={fieldNames.FinancialBasisTypeID}>
          <Select>
            {financialBasisTypes.map((x) => {
              return (
                <Select.Option key={x.ID + x.Name} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Description" {...layout} name={fieldNames.Description}>
          <Input />
        </Form.Item>

        <Form.Item label="GL Accounts" {...layout} name={fieldNames.GLAccountID}>
          <Select>
            {glAccountTypes.map((x) => {
              return <Select.Option key={x.ID + x.Name} value={x.ID}>{`${x.Name} (${x.Description})`}</Select.Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Amount" {...layout} name={fieldNames.ItemUnitAmount}>
          <Input />
        </Form.Item>

        <Form.Item label="Type" {...layout} name={fieldNames.IsCharge}>
          <Radio.Group>
            <Radio value={true}>Income</Radio>
            <Radio value={false}>Expense</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name={fieldNames.IsOptional} label="Item is Optional" {...layout}>
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={fieldNames.IsTaxable} label="Taxable" {...layout}>
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name={fieldNames.IsActive} label="Active" {...layout}>
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Weight" {...layout} name={fieldNames.Weight}>
          <Input />
        </Form.Item>
      </Form>
    </Card>
  )
}
