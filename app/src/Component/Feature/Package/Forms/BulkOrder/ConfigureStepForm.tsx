import React, { useState } from "react"
import { Col, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormInput } from "~/Component/Common/Form/FormInput"
import "~/Sass/utils.scss"

interface IConfigureStepFormProps {
  formInstance: FormInstance
  initialValue: { [key: string]: any }
}

export default function ConfiguretStepForm(props: IConfigureStepFormProps) {
  const isEnableSeatAffiliate = props.formInstance.getFieldValue("IsEnableSeatAffiliate")
  const [showGenerateOrder, setShowGenerateOrder] = useState<boolean>(isEnableSeatAffiliate ? true : false)

  const onChangeAffiliateSeat = (event: any) => {
    if (event.target.value) {
      setShowGenerateOrder(true)
    } else {
      props.formInstance.setFieldsValue({ IsGenerateOrder: false })
      setShowGenerateOrder(false)
    }
  }

  return (
    <Row>
      <Col xs={24} sm={24} md={24}>
        <FormInput
          rules={[{ required: true, message: "Please enter package name!" }]}
          labelColSpan={8}
          wrapperColSpan={10}
          formInstance={props.formInstance}
          label={"Package Name"}
          ariaLabel={"Package Name"}
          fieldName="Name"
        />

        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Allocate from default seat group"}
          ariaLabel={"Allocate from default seat group"}
          fieldName="IsDefaultAllocation"
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Enable Cost Per Seat For Affiliate"}
          ariaLabel={"Enable Cost Per Seat For Affiliate"}
          fieldName="IsEnableSeatAffiliate"
          onChangeCallback={(e) => onChangeAffiliateSeat(e)}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Enable Cost Per Seat For Student"}
          ariaLabel={"Enable Cost Per Seat For Student"}
          fieldName="IsEnableSeatStudent"
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          disabled={!showGenerateOrder}
          formInstance={props.formInstance}
          label={"Generate package order"}
          ariaLabel={"Generate package order"}
          fieldName="IsGenerateOrder"
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
      </Col>
    </Row>
  )
}
