import React from "react"
import { Card, Button, Input } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IFieldNames } from "~/component/Offering/Interfaces"
import OfferingDetails from "~/component/Offering/CreateEdit/Form2/OfferingDetails"
import OfferingTimings from "~/component/Offering/CreateEdit/Form2/OfferingTimings"
import OfferingCoreChar from "~/component/Offering/CreateEdit/Form2/OfferingCoreChar"
import OfferingDefaultSection from "~/component/Offering/CreateEdit/Form2/OfferingDefaultSection"

interface IOfferingCreateForm2Props {
  formInstance: FormInstance
  fieldNames: IFieldNames
  initialFormValue: { [key: string]: any }
  onFormSubmission: () => void
  goBackToFirstForm: () => void
  handleCancel: () => void
}

// const layout = {
//   labelCol: { span: 6 }
// }

export default function CreateForm2(props: IOfferingCreateForm2Props) {
  const actions = []
  if (!props.initialFormValue.Name) {
    actions.push(<Button onClick={props.goBackToFirstForm}>Go Back</Button>)
  }
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={props.onFormSubmission}>Submit</Button>)
  return (
    <Card
      title={
        props.initialFormValue && props.initialFormValue.Name
          ? `Edit '${props.initialFormValue.Name}' Offering`
          : "Create new offering"
      }
      actions={actions}
    >
      <Form
        hideRequiredMark
        form={props.formInstance}
        initialValues={props.initialFormValue}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
      >
        <ul>
          <li>All fields marked with an asterisk (*) are required.</li>
          <li>Dates should be typed in the format mm/dd/yyyy</li>
        </ul>
        <Form.Item style={{ visibility: "hidden" }} name={props.fieldNames.OfferingTypeID}>
          <Input />
        </Form.Item>
        <Form.Item style={{ visibility: "hidden" }} name={props.fieldNames.OfferingID}>
          <Input />
        </Form.Item>
        <OfferingDetails
          formInstance={props.formInstance}
          fieldNames={props.fieldNames}
          initialFormValue={props.initialFormValue}
        />
        <OfferingTimings
          formInstance={props.formInstance}
          fieldNames={props.fieldNames}
          initialFormValue={props.initialFormValue}
        />
        <OfferingCoreChar
          formInstance={props.formInstance}
          fieldNames={props.fieldNames}
          initialFormValue={props.initialFormValue}
        />
        <OfferingDefaultSection
          formInstance={props.formInstance}
          fieldNames={props.fieldNames}
          initialFormValue={props.initialFormValue}
        />
      </Form>
    </Card>
  )
}
