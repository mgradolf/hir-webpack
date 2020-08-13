import React, { useState } from "react"
import { Form, Radio, Select } from "antd"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"

interface IOfferingCreateForm1Props {
  formInstance: FormInstance
  fieldNames: IFieldNames
  initialFormValue: { [key: string]: any }
  offeringTypes: Array<any>
  onOfferingTypeSelected: (flag: boolean) => void
}

export default function CreateForm1(props: IOfferingCreateForm1Props) {
  const [radioValues] = useState([
    { label: "Create default offering type", value: 1000, default: true },
    { label: "Select other offering type", value: "OTHER", default: false }
  ])

  const [offeringTypesVisible, setOfferingTypesVisible] = useState(false)
  const onChangeOfferingTypes = () => {
    props.formInstance.getFieldValue(props.fieldNames.OfferingTypeID) === 1000
      ? setOfferingTypesVisible(true)
      : setOfferingTypesVisible(false)
  }

  return (
    <Form form={props.formInstance} hideRequiredMark layout="vertical" initialValues={props.initialFormValue}>
      <Form.Item
        label="Please select an offering type to create"
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
  )
}
