import React, { useState, useEffect } from "react"
import { Form, Radio, Select, Card, Button, Input } from "antd"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import {} from "@ant-design/icons"
import { RadioChangeEvent } from "antd/lib/radio"
import { getOfferingTypes } from "~/ApiServices/Service/RefLookupService"

interface IOfferingCreateForm1Props {
  formInstance: FormInstance
  fieldNames: IFieldNames
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  handleSelected: () => void
}

export default function CreateForm1(props: IOfferingCreateForm1Props) {
  const [offeringTypes, setofferingTypes] = useState<Array<any>>([])
  const [radioValues] = useState([
    { label: "Default", value: 1000, default: true },
    { label: "Other", value: "OTHER", default: false }
  ])
  const [offeringTypesVisible, setOfferingTypesVisible] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    props.formInstance.getFieldValue(props.fieldNames.OfferingTypeID) ? setIsSelected(true) : setIsSelected(false)
    ;(async () => {
      const response = await getOfferingTypes()
      if (response && response.success) {
        setofferingTypes(response.data)
      }
    })()
  }, [props])
  const onChangeOfferingTypes = (e: RadioChangeEvent) => {
    if (e.target.value === 1000) {
      setOfferingTypesVisible(false)
      setIsSelected(true)
      props.formInstance.setFieldsValue({ [props.fieldNames.OfferingTypeID]: 1000 })
    } else if (e.target.value === "OTHER") {
      setOfferingTypesVisible(true)
      setIsSelected(false)
      props.formInstance.setFieldsValue({ [props.fieldNames.OfferingTypeID]: undefined })
    }
  }

  return (
    <Card
      title="Create new Offering"
      actions={[
        <Button
          onClick={() => {
            console.log(props.formInstance.getFieldsValue())
          }}
        >
          Print
        </Button>,
        <Button
          onClick={() => {
            props.handleCancel()
          }}
        >
          Cancel
        </Button>,
        <Button onClick={props.handleSelected} disabled={!isSelected}>
          Select
        </Button>
      ]}
    >
      <Form form={props.formInstance} hideRequiredMark layout="horizontal" initialValues={props.initialFormValue}>
        <Form.Item
          label="Select an offering type"
          name="offeringTypeRadio"
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
        {!offeringTypesVisible && (
          <Form.Item
            style={{ visibility: "hidden", margin: 0, padding: 0, width: "1px", height: "1px" }}
            label="Other offering types"
            name={props.fieldNames.OfferingTypeID}
            rules={[{ required: true, message: "Please select an offering type!" }]}
          >
            <Input />
          </Form.Item>
        )}
        {offeringTypesVisible && (
          <Form.Item
            label="Other offering types"
            name={props.fieldNames.OfferingTypeID}
            rules={[{ required: true, message: "Please select an offering type!" }]}
          >
            <Select
              placeholder="Select an offering type"
              onSelect={() => {
                setIsSelected(true)
              }}
            >
              {offeringTypes.length &&
                offeringTypes.map((offer) => {
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
