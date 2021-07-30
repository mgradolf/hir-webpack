import React, { useEffect, useState } from "react"
import { Col, Row, Form, Select } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { getOfferingTypes } from "~/ApiServices/Service/RefLookupService"
import { DEFAULT_OFFERING_TYPE_ID } from "~/utils/Constants"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import "~/Sass/utils.scss"

interface IFirstStepFormProps {
  formInstance: FormInstance
  fieldNames: IOfferingFieldNames
  initialValue: { [key: string]: any }
}

export default function FirstStepForm(props: IFirstStepFormProps) {
  const offeringType = props.formInstance.getFieldValue("OfferingTypes")

  const [offeringTypes, setofferingTypes] = useState<Array<any>>([])
  const [offeringTypesVisible, setOfferingTypesVisible] = useState(offeringType !== undefined ? !offeringType : false)

  useEffect(() => {
    ;(async () => {
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
    })()
  }, [offeringTypesVisible])

  const onChangeOfferingTypes = (value: any) => {
    if (!value) {
      setOfferingTypesVisible(true)
    } else {
      setOfferingTypesVisible(false)
      props.formInstance.resetFields()
      props.formInstance.setFieldsValue({ OfferingTypes: true })
    }
  }

  const onSelectOfferingTypes = (offeringTypeID: any) => {
    const selectedOfferingTypes = offeringTypes.filter((x) => x.OfferingTypeID === offeringTypeID)
    Object.keys(selectedOfferingTypes[0]).forEach((x) => {
      props.formInstance.setFieldsValue({ [x]: selectedOfferingTypes[0][x] })
    })
  }

  return (
    <Row>
      <Col xs={24} sm={24} md={24}>
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Select an offering type"}
          ariaLabel={"Select an offering type"}
          fieldName="OfferingTypes"
          onChangeCallback={(e) => onChangeOfferingTypes(e)}
          options={[
            { label: "Default", value: true },
            { label: "Other", value: false }
          ]}
        />
        <Form.Item
          label="Other offering types"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          name={props.fieldNames.OfferingTypeID}
          rules={[{ required: offeringTypesVisible, message: "Please select an offering type!" }]}
        >
          <Select
            disabled={!offeringTypesVisible}
            placeholder="Select an offering type"
            aria-label="Offering Type Select"
            onChange={(e) => onSelectOfferingTypes(e)}
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
      </Col>
    </Row>
  )
}
