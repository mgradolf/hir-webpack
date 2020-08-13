import React, { useState } from "react"
import { Form, Radio, Select, Card, Button } from "antd"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import {} from "@ant-design/icons"

interface IOfferingCreateForm1Props {
  formInstance: FormInstance
  fieldNames: IFieldNames
  initialFormValue: { [key: string]: any }
  offeringTypes: Array<any>
  handleCancel: () => void
  handleSelected: () => void
}

export default function CreateForm1(props: IOfferingCreateForm1Props) {
  const [radioValues] = useState([
    { label: "Default", value: 1000, default: true },
    { label: "Other", value: "OTHER", default: false }
  ])

  const [offeringTypesVisible, setOfferingTypesVisible] = useState(false)
  const onChangeOfferingTypes = () => {
    props.formInstance.getFieldValue(props.fieldNames.OfferingTypeID) === 1000
      ? setOfferingTypesVisible(true)
      : setOfferingTypesVisible(false)
  }

  return (
    <Card
      actions={[
        <Button onClick={props.handleCancel}>Cancel</Button>,
        <Button onClick={props.handleSelected}>Select</Button>
      ]}
    >
      <Form form={props.formInstance} hideRequiredMark layout="horizontal" initialValues={props.initialFormValue}>
        <Form.Item
          label="Select an offering type"
          name={props.fieldNames.OfferingTypeID}
          rules={[{ required: true, message: "Please input an offering type!" }]}
        >
          <Radio.Group>
            {radioValues.map((opt, index) => (
              <Radio value={opt.value} key={index} onChange={onChangeOfferingTypes}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        {offeringTypesVisible && (
          <Form.Item
            label="Other offering types"
            name={props.fieldNames.OfferingTypeID}
            rules={[{ required: true, message: "Please select an offering type!" }]}
          >
            <Select placeholder="Select an offering type">
              {props.offeringTypes.length &&
                props.offeringTypes.map((offer) => {
                  return (
                    <Select.Option key={offer.OfferingTypeID} value={offer.OfferingTypeID}>
                      {offer.Name}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Card>
  )
}
