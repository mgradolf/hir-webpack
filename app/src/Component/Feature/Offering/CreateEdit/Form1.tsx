import React, { useState, useEffect } from "react"
import { Form, Radio, Select, Card, Button, Input } from "antd"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import {} from "@ant-design/icons"
import { RadioChangeEvent } from "antd/lib/radio"
import { getOfferingTypes } from "~/ApiServices/Service/RefLookupService"
import "~/Sass/utils.scss"
import { DEFAULT_OFFERING_TYPE_ID } from "~/utils/Constants"

interface IOfferingCreateForm1Props {
  formInstance: FormInstance
  fieldNames: IOfferingFieldNames
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  handleSelected: (param: { [key: string]: any }) => void
}

export default function CreateForm1(props: IOfferingCreateForm1Props) {
  const [offeringTypes, setofferingTypes] = useState<Array<any>>([])
  const [disableRadios, setDisableRadios] = useState(false)
  const [radioValues] = useState([
    { label: "Default", value: DEFAULT_OFFERING_TYPE_ID, default: true },
    { label: "Other", value: "OTHER", default: false }
  ])
  const [offeringTypesVisible, setOfferingTypesVisible] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    props.formInstance.getFieldValue(props.fieldNames.OfferingTypeID) ? setIsSelected(true) : setIsSelected(false)
    ;(async () => {
      setDisableRadios(true)
      const response = await getOfferingTypes()
      if (response && response.success && Array.isArray(response.data)) {
        setofferingTypes(
          response.data.map((x: any) => {
            if (x.OfferingTypeID === DEFAULT_OFFERING_TYPE_ID) {
              x.OfferingStatusCodeID = 0
            }
            return x
          })
        )
      }
      setDisableRadios(false)

      if (props.formInstance.getFieldValue("offeringTypeRadio") === "OTHER") {
        setOfferingTypesVisible(true)
      }
    })()
    return () => {
      props.formInstance.setFieldsValue({ [props.fieldNames.OfferingTypeID]: undefined })
    }
  }, [props])

  const onChangeOfferingTypes = (e: RadioChangeEvent) => {
    if (e.target.value === DEFAULT_OFFERING_TYPE_ID) {
      setOfferingTypesVisible(false)
      setIsSelected(true)
      props.formInstance.setFieldsValue({ [props.fieldNames.OfferingTypeID]: DEFAULT_OFFERING_TYPE_ID })
    } else if (e.target.value === "OTHER") {
      setOfferingTypesVisible(true)
      setIsSelected(false)
      props.formInstance.setFieldsValue({ [props.fieldNames.OfferingTypeID]: undefined })
    }
  }

  const onSelectOtherOfferingType = () => {
    const selectedOfferingType = offeringTypes.find(
      (x) => x.OfferingTypeID === props.formInstance.getFieldValue(props.fieldNames.OfferingTypeID)
    )
    props.handleSelected(selectedOfferingType)
  }

  return (
    <Card
      title="Create new Offering"
      actions={[
        <Button
          onClick={() => {
            props.handleCancel()
          }}
        >
          Cancel
        </Button>,
        <Button onClick={onSelectOtherOfferingType} disabled={!isSelected}>
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
          <Radio.Group aria-label="Offering Type" disabled={disableRadios}>
            {radioValues.map((opt, index) => (
              <Radio value={opt.value} key={index} onChange={onChangeOfferingTypes}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        {!offeringTypesVisible && (
          <Form.Item
            className="hidden"
            label="Other offering types"
            name={props.fieldNames.OfferingTypeID}
            rules={[{ required: true, message: "Please select an offering type!" }]}
          >
            <Input aria-label="Other Offering Type" />
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
              aria-label="Offering Type Select"
              onSelect={() => {
                setIsSelected(true)
              }}
            >
              {offeringTypes.length &&
                offeringTypes.map((offer) => {
                  return (
                    <Select.Option key={offer.OfferingTypeID} value={offer.OfferingTypeID}>
                      {offer.OfferingTypeName}
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
