import { Col, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useState } from "react"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"

export interface IFieldNames {
  SectionID: string
  StartDate: string
  Schedule: string
  Location: string
  Instructor: string
  Notes: string
  Financials: string
  Discount: string
  Product: string
}

const fieldNames: IFieldNames = {
  SectionID: "SectionID",
  Schedule: "Schedule",
  Location: "Location",
  Instructor: "Instructor",
  Notes: "Notes",
  StartDate: "StartDate",
  Financials: "Financials",
  Discount: "Discount",
  Product: "Product"
}

interface ISectionCopyForm {
  SectionID: number
  formInstance: FormInstance
}

export default function SectionCopyForm(props: ISectionCopyForm) {
  const [disableScheduleGroup, setDisableScheduleGroup] = useState(true)

  return (
    <Row>
      <Col xs={24} sm={24} md={12}>
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Schedule"}
          ariaLabel={"Schedule"}
          fieldName={fieldNames.Schedule}
          onChangeCallback={(e) => {
            const isChecked = e.target.value
            setDisableScheduleGroup(!isChecked)
            props.formInstance.setFieldsValue({ [fieldNames.Location]: isChecked })
            props.formInstance.setFieldsValue({ [fieldNames.Instructor]: isChecked })
            props.formInstance.setFieldsValue({ [fieldNames.Notes]: isChecked })
          }}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
      </Col>

      <Col xs={24} sm={24} md={12}>
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Location"}
          ariaLabel={"Location"}
          fieldName={fieldNames.Location}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
          disabled={disableScheduleGroup}
        />
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Instructor"}
          ariaLabel={"Instructor"}
          fieldName={fieldNames.Instructor}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
          disabled={disableScheduleGroup}
        />
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Notes"}
          ariaLabel={"Notes"}
          fieldName={fieldNames.Notes}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
          disabled={disableScheduleGroup}
        />
      </Col>

      <Col xs={24} sm={24} md={12}>
        <FormDatePicker
          label="StartDate"
          labelColSpan={8}
          wrapperColSpan={14}
          disabled={disableScheduleGroup}
          formInstance={props.formInstance}
          fieldName={fieldNames.StartDate}
          placeholder="MM/DD/YYYY"
        />

        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Financials"}
          ariaLabel={"Financials"}
          fieldName={fieldNames.Financials}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Discount"}
          ariaLabel={"Discount"}
          fieldName={fieldNames.Discount}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Product"}
          ariaLabel={"Product"}
          fieldName={fieldNames.Product}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
      </Col>
    </Row>
  )
}
