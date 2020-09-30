import React, { useState, useEffect } from "react"
import { Form, Radio, Select, Card, Button, Input } from "antd"
import { IOfferingFieldNames } from "~/Component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import { } from "@ant-design/icons"
import { RadioChangeEvent } from "antd/lib/radio"
import { getOfferingTypes } from "~/ApiServices/Service/RefLookupService"
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
              debugger;
              setIsSelected(true)
              setSelectedValue(value)
            }}
          >
            <Select.Option key="offering" value="offering">
              Offering Financials
            </Select.Option>
            <Select.Option key="instructor" value="instructor">
              Instructor Financials
            </Select.Option>
            <Select.Option key="resource" value="resource">
              Resource Financials
            </Select.Option>
            <Select.Option key="marketingProgram" value="marketingProgram">
              Marketing Program Financials
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  )
}
