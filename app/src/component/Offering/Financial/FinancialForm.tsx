import React from "react"
import { Card, Button, Input, Select, Radio } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingFinancialFieldNames } from "~/component/Offering/Interfaces"

interface IOfferingCreateForm2Props {
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
  actions.push(<Button onClick={() => console.log(props.formInstance.getFieldsValue())}>Cancel</Button>)
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={props.onFormSubmission}>Submit</Button>)
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
        <Form.Item label="Category" name={fieldNames.FinancialCategoryTypeID} {...layout}>
          <Select>
            <Select.Option value="1">Expense</Select.Option>
            <Select.Option value="12">Income</Select.Option>
            <Select.Option value="13">Sales</Select.Option>
            <Select.Option value="14">Shipping</Select.Option>
            <Select.Option value="15">Unknown</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Basis" {...layout} name={fieldNames.FinancialBasisTypeID}>
          <Select>
            <Select.Option value="1">Per enrollment</Select.Option>
            <Select.Option value="12">Per unit</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" {...layout} name={fieldNames.Description}>
          <Input />
        </Form.Item>

        <Form.Item label="GL Accounts" {...layout} name={fieldNames.GLAccountID}>
          <Select>
            <Select.Option value="1">General Account</Select.Option>
            <Select.Option value="12">Eligible</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="GL Description" {...layout}>
          <Input value="" disabled />
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
