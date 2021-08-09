import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Form } from "antd"
import React, { useState } from "react"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInstance } from "antd/lib/form"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { saveOrUpdateEmailNotification } from "~/ApiServices/Service/ProgramService"
import { FormCheckbox } from "~/Component/Common/Form/FormCheckbox"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { ProgramNotificationEmailRecipeintSection } from "~/Component/Feature/ProgramNotification/ProgramNotificationEmailRecipeintSection"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

interface IFieldNames {
  ProgramEmailNoticeID: any
  ProgramID: any
  ProgramEmailEventID: any
  FromUserID: any
  FromEmailAddress: any
  Subject: any
  Message: any
  MimeType: any
  IsActive: any
}

const FieldNames: IFieldNames = {
  Subject: "Subject",
  Message: "Message",
  FromUserID: "FromUserID",
  FromEmailAddress: "FromEmailAddress",
  IsActive: "IsActive",
  ProgramEmailEventID: "ProgramEmailEventID",
  ProgramID: "ProgramID",
  ProgramEmailNoticeID: "ProgramEmailNoticeID",
  MimeType: "MimeType"
}

const fromUserOrEmail = {
  user: 1,
  email: 2
}
const ProgramEmailNotificationForm = (props: {
  formInstance: FormInstance
  setLoading: (flag: boolean) => void
  EmailNotification: { [key: string]: any }
}) => {
  const [fromUserSelected, setFromUserSelected] = useState(true)
  return (
    <>
      <FormInput label="ProgramID" formInstance={props.formInstance} fieldName={FieldNames.ProgramID} hidden />
      <FormInput
        label="ProgramEmailEventID"
        formInstance={props.formInstance}
        fieldName={FieldNames.ProgramEmailEventID}
        hidden
      />
      <FormInput
        label="ProgramEmailNoticeID"
        formInstance={props.formInstance}
        fieldName={FieldNames.ProgramEmailNoticeID}
        hidden
      />

      <FormInput formInstance={props.formInstance} label="Subject" fieldName={FieldNames.Subject} />

      <FormTextArea formInstance={props.formInstance} label="Message" fieldName={FieldNames.Message} />

      <FormMultipleRadio
        formInstance={props.formInstance}
        label="Select From"
        defaultValue={fromUserOrEmail.user}
        options={[
          { label: "From User", value: fromUserOrEmail.user },
          { label: "From Email", value: fromUserOrEmail.email }
        ]}
        fieldName=""
        onChangeCallback={(Param: number) => {
          if (Param) setFromUserSelected(Param === fromUserOrEmail.user)
          console.log(Param)
        }}
      />

      <FormDropDown
        label="From User"
        formInstance={props.formInstance}
        refLookupService={() => getAllUsers({})}
        displayKey="FormattedName"
        valueKey="UserID"
        fieldName={FieldNames.FromUserID}
        disabled={!fromUserSelected}
      />

      <FormInput
        label="From Email"
        fieldName={FieldNames.FromEmailAddress}
        formInstance={props.formInstance}
        disabled={fromUserSelected}
        rules={[{ message: "Please enter valid email address!", type: "email" }]}
      />

      <FormCheckbox
        label="Is Active"
        formInstance={props.formInstance}
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false }
        ]}
        fieldName={FieldNames.IsActive}
      />
      <ProgramNotificationEmailRecipeintSection
        formInstance={props.formInstance}
        EmailNotification={props.EmailNotification}
      />
    </>
  )
}

export const ProgramNotificationEmailSetupButton = (props: { EmailNotification: { [key: string]: any } }) => {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<ISimplifiedApiErrorMessage[]>([])

  const onFormSubmission = async (closeModal: () => void) => {
    await formInstance.validateFields()
    const params = formInstance.getFieldsValue()

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = saveOrUpdateEmailNotification

    setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    setApiCallInProgress(false)

    if (response && response.success) {
      eventBus.publish(REFRESH_PAGE)
      closeModal()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }
  return (
    <CustomFormModalOpenButton
      formTitle="Email Notification Setup"
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={props.EmailNotification}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      customForm={
        <ProgramEmailNotificationForm
          formInstance={formInstance}
          setLoading={setLoading}
          EmailNotification={props.EmailNotification}
        />
      }
      buttonLabel="Setup Email Notification"
      iconType="edit"
      errorMessages={errorMessages}
      disabled={props.EmailNotification.ProgramEmailNoticeID === null}
    />
  )
}
