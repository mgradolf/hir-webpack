import React from "react"
import { Card, Button } from "antd"
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
  return (
    <Card
      title="Create Offering"
      actions={[
        <Button onClick={props.goBackToFirstForm}>Go Back</Button>,
        <Button onClick={props.handleCancel}>Cancel</Button>,
        <Button onClick={props.onFormSubmission}>Submit</Button>
      ]}
    >
      <Form
        hideRequiredMark
        form={props.formInstance}
        initialValues={props.initialFormValue}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
      >
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
