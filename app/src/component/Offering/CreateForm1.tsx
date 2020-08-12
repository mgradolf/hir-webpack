import React, { useState } from "react"
import { Form, Radio, Select } from "antd"
import { FormInstance } from "antd/lib/form"

interface IFormContentsProps {
  formInstance: FormInstance
  offeringTypes: Array<any>
  onOfferingTypeSelected: (flag: boolean) => void
}

const initialFormValue: { [key: string]: any } = {
  OfferingTypeID: 1000
}

export default function CreateForm1(props: IFormContentsProps) {
  const [radioValues] = useState([
    { label: "Create default offering type", value: 1000, default: true },
    { label: "Select other offering type", value: "OTHER", default: false }
  ])

  const [offeringTypesVisible, setOfferingTypesVisible] = useState(false)
  const onChangeOfferingTypes = () => {
    props.formInstance.getFieldValue("OfferingTypeID") === 1000
      ? setOfferingTypesVisible(true)
      : setOfferingTypesVisible(false)
  }

  return (
    <Form form={props.formInstance} hideRequiredMark layout="vertical" initialValues={initialFormValue}>
      <Form.Item
        label="Please select an offering type to create"
        name="OfferingTypeID"
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
          name="OfferingTypeID"
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
  )
}
