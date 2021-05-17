import { Col, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useEffect, useState } from "react"
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
  initialData: { [key: string]: any }
  formInstance: FormInstance
}

export default function SectionCopyForm(props: ISectionCopyForm) {
  const [disableScheduleGroup, setDisableScheduleGroup] = useState<boolean>(false)
  const [disableDiscount, setDisableDiscount] = useState<boolean>(false)

  useEffect(() => {
    setDisableScheduleGroup(props.initialData.StartDate === null)
  }, [props])

  return (
    <Row>
      <Col xs={24} sm={24} md={12}>
        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Schedule"}
          ariaLabel={"Schedule"}
          disabled={props.initialData.StartDate === null}
          fieldName={fieldNames.Schedule}
          onChangeCallback={(isChecked) => {
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
          defaultValue={props.initialData.StartDate}
          placeholder="MM/DD/YYYY"
        />

        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Financials"}
          ariaLabel={"Financials"}
          fieldName={fieldNames.Financials}
          onChangeCallback={(isChecked) => {
            setDisableDiscount(!isChecked)
          }}
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
          disabled={disableDiscount}
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
