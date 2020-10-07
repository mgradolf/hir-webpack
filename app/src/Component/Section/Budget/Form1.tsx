import React, { useState } from "react"
import { Form, Select, Card, Button } from "antd"
import {} from "@ant-design/icons"
import "~/Sass/utils.scss"
import {
  BUDGET_FINANCIAL_TYPE_INSTRUCTOR,
  BUDGET_FINANCIAL_TYPE_MARKETING_PROGRAM,
  BUDGET_FINANCIAL_TYPE_OFFERING,
  BUDGET_FINANCIAL_TYPE_RESOURCE
} from "~/utils/Constants"

interface IBudgetCreateForm1Props {
  handleCancel: () => void
  handleSelected: (param: any) => void
}

export default function CreateForm1(props: IBudgetCreateForm1Props) {
  const [isSelected, setIsSelected] = useState(false)
  const [selectedValue, setSelectedValue] = useState(String)

  const onSelectFinancialType = () => {
    props.handleSelected(selectedValue)
  }

  return (
    <Card
      title="Create new Budget"
      actions={[
        <Button
          onClick={() => {
            props.handleCancel()
          }}
        >
          Cancel
        </Button>,
        <Button onClick={onSelectFinancialType} disabled={!isSelected}>
          Select
        </Button>
      ]}
    >
      <Form hideRequiredMark layout="horizontal">
        <Form.Item
          label="Budget financial types"
          rules={[{ required: true, message: "Please select an financial type!" }]}
        >
          <Select
            placeholder="Select an financial type"
            aria-label="Financial Type Select"
            onSelect={(value: any) => {
              setIsSelected(true)
              setSelectedValue(value)
            }}
          >
            <Select.Option key="offering" value={BUDGET_FINANCIAL_TYPE_OFFERING}>
              Offering Financials
            </Select.Option>
            <Select.Option key="instructor" value={BUDGET_FINANCIAL_TYPE_INSTRUCTOR}>
              Instructor Financials
            </Select.Option>
            <Select.Option key="resource" value={BUDGET_FINANCIAL_TYPE_RESOURCE}>
              Resource Financials
            </Select.Option>
            <Select.Option key="marketingProgram" value={BUDGET_FINANCIAL_TYPE_MARKETING_PROGRAM}>
              Marketing Program Financials
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  )
}
