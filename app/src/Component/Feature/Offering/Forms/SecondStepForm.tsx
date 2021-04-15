import React from "react"
import { Col, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import OfferingTimingForm from "~/Component/Feature/Offering/Forms/OfferingTimingForm"
import "~/Sass/utils.scss"

interface ISecondStepFormProps {
  formInstance: FormInstance
  fieldNames: IOfferingFieldNames
  initialValue: { [key: string]: any }
}

export default function SecondStepForm(props: ISecondStepFormProps) {
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24}>
          <FormInput
            maxLength={16}
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Offering Code"}
            ariaLabel={"Offering Code"}
            formInstance={props.formInstance}
            fieldName={props.fieldNames.OfferingCode}
            rules={[
              {
                required: true,
                message: "Please enter Offering Code"
              }
            ]}
          />

          <FormInput
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Offering Name"}
            ariaLabel={"Offering Name"}
            formInstance={props.formInstance}
            fieldName={props.fieldNames.Name}
            rules={[
              {
                required: true,
                message: "Please enter Offering Name"
              }
            ]}
          />

          <FormTextArea
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Description"}
            ariaLabel={"Description"}
            formInstance={props.formInstance}
            fieldName={props.fieldNames.Description}
          />

          <FormInput
            labelColSpan={8}
            wrapperColSpan={14}
            label={"URL"}
            ariaLabel={"URL"}
            formInstance={props.formInstance}
            fieldName={props.fieldNames.URL}
          />
        </Col>
      </Row>
      <OfferingTimingForm
        formInstance={props.formInstance}
        fieldNames={props.fieldNames}
        initialValue={props.initialValue}
      />
    </>
  )
}
