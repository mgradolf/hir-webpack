import React, { useState } from "react"
import { Form, Select, Card, Button } from "antd"
import { } from "@ant-design/icons"
import "~/Sass/utils.scss"

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
            <Select.Option key="offering" value="Offering">
              Offering Financials
            </Select.Option>
            <Select.Option key="instructor" value="Instructor">
              Instructor Financials
            </Select.Option>
            <Select.Option key="resource" value="Resource">
              Resource Financials
            </Select.Option>
            <Select.Option key="marketingProgram" value="Marketing Program">
              Marketing Program Financials
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  )
}
