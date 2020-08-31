import React from "react"
import { Card, Button, Input } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingFieldNames } from "~/component/Offering/Interfaces"
import OfferingDetails from "~/component/Offering/CreateEdit/Form2/OfferingDetails"
import OfferingTimings from "~/component/Offering/CreateEdit/Form2/OfferingTimings"
import OfferingCoreChar from "~/component/Offering/CreateEdit/Form2/OfferingCoreChar"
import OfferingDefaultSection from "~/component/Offering/CreateEdit/Form2/OfferingDefaultSection"
import { hidden } from "~/utils/style"

interface IOfferingCreateForm2Props {
  editMode: boolean
  formInstance: FormInstance
  fieldNames: IOfferingFieldNames
  initialFormValue: { [key: string]: any }
  resetForm: (param: { [key: string]: any }) => void
  onFormSubmission: () => void
  goBackToFirstForm: () => void
  handleCancel: () => void
}

export default function CreateForm2(props: IOfferingCreateForm2Props) {
  const actions = []
  if (!props.editMode) {
    actions.push(
      <Button
        onClick={() => {
          props.resetForm({})
          props.goBackToFirstForm()
        }}
      >
        Go Back
      </Button>
    )
  }
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={props.onFormSubmission}>Submit</Button>)
  return (
    <Card
      title={props.editMode ? `Edit '${props.initialFormValue.Name}' Offering` : "Create new offering"}
      actions={actions}
    >
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
      >
        <ul>
          <li>All fields marked with an asterisk (*) are required.</li>
          <li>Dates should be typed in the format mm/dd/yyyy</li>
        </ul>
        <Form.Item style={hidden} name={props.fieldNames.OfferingTypeID}>
          <Input />
        </Form.Item>
        <Form.Item style={hidden} name={props.fieldNames.OfferingID}>
          <Input />
        </Form.Item>
        <OfferingDetails formInstance={props.formInstance} fieldNames={props.fieldNames} />
        <OfferingTimings formInstance={props.formInstance} fieldNames={props.fieldNames} />
        <OfferingCoreChar formInstance={props.formInstance} fieldNames={props.fieldNames} editMode={props.editMode} />
        <OfferingDefaultSection formInstance={props.formInstance} fieldNames={props.fieldNames} />
      </Form>
    </Card>
  )
}
