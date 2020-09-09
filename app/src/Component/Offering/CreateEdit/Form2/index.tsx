import React, { useState } from "react"
import { Dispatch } from "redux"
import { Card, Button, Input } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingFieldNames } from "~/Component/Offering/Interfaces"
import OfferingDetails from "~/Component/Offering/CreateEdit/Form2/OfferingDetails"
import OfferingTimings from "~/Component/Offering/CreateEdit/Form2/OfferingTimings"
import OfferingCoreChar from "~/Component/Offering/CreateEdit/Form2/OfferingCoreChar"
import OfferingDefaultSection from "~/Component/Offering/CreateEdit/Form2/OfferingDefaultSection"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { updateOffering, createOffering } from "~/ApiServices/Service/OfferingService"
import FormError from "~/Component/FormError"
import { connect } from "react-redux"
import { showCreateOfferingModal } from "~/store/ModalState"
import { redirect } from "~/store/ConnectedRoute"
import "~/sass/global/index.scss"

interface IOfferingCreateForm2Props {
  editMode: boolean
  formInstance: FormInstance
  fieldNames: IOfferingFieldNames
  initialFormValue: { [key: string]: any }
  redirect?: (url: string) => void
  closeCreateOfferingModal?: () => void
  goBackToFirstForm: () => void
  setApiCallInProgress: (flag: boolean) => void
}

function CreateForm2(props: IOfferingCreateForm2Props) {
  const actions = []
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue() as IOfferingFieldNames
    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = props.editMode
      ? updateOffering
      : createOffering

    setErrorMessages([])
    props.setApiCallInProgress(true)
    params.OfferingCode = "ML110-4"
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      props.closeCreateOfferingModal && props.closeCreateOfferingModal()
      if (props.redirect) {
        props.redirect(`/offering/${response.data.OfferingID}`)
      }
    } else {
      console.log(response.error.getErrorMessages())
      document.getElementById("errorMessages")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      })
      setErrorMessages(response.error.getErrorMessages())
    }
  }
  if (!props.editMode) {
    actions.push(
      <Button
        onClick={() => {
          props.goBackToFirstForm()
        }}
      >
        Go Back
      </Button>
    )
  }
  actions.push(<Button onClick={props.closeCreateOfferingModal}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card
      title={
        props.editMode ? `Edit '${props.formInstance.getFieldValue("OfferingCode")}' Offering` : "Create new offering"
      }
      actions={actions}
    >
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
      >
        <ul id="errorMessages">
          <li>
            All fields marked with an asterisk (<span style={{ color: "red" }}>*</span>) are required.
          </li>
          <li>Dates should be typed in the format mm/dd/yyyy</li>
        </ul>
        <FormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.OfferingTypeID}>
          <Input />
        </Form.Item>
        <Form.Item className="hidden" name={props.fieldNames.OfferingID}>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeCreateOfferingModal: () => dispatch(showCreateOfferingModal({ value: false })),
    redirect: (url: string) => dispatch(redirect(url))
  }
}

export default connect(undefined, mapDispatchToProps)(CreateForm2)
