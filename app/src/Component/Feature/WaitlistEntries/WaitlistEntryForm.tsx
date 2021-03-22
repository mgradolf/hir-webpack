import React, { useEffect, useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, DatePicker, Form, Input, Radio, Switch } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldDropDown } from "~/Component/Common/OldForm/OldDropDown"
import { getSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import { DATE_FORMAT, DEFAULT_HIR_ADMIN_SOURCE_ID } from "~/utils/Constants"
import { OldFormPersonLookup } from "~/Component/Common/OldForm/OldFormLookups/OldFormPersonLookup"
import { eventBus, REFRESH_SECTION_WAITLIST_ENTRIES_PAGE } from "~/utils/EventBus"
import { saveWaitListEntry } from "~/ApiServices/Service/WaitlistEntryService"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { getAccountByPurchaserID } from "~/ApiServices/Service/AccountService"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInstance } from "antd/lib/form"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"

interface IFormFields {
  SeatGroupID: string
  AccountID: string
  RequesterPersonID: string
  RecipientPersonID: string
  AdministratedByUID: string
  RequestExpirationTime: string
  SourceID: string
  ConfirmationEmailToRequester: string
  InvitationEmailToRequester: string
  InvitationEmailToRecipient: string
  Priority: string
  IsActive: string
}

const fieldNames: IFormFields = {
  SeatGroupID: "SeatGroupID",
  AccountID: "AccountID",
  RequesterPersonID: "RequesterPersonID",
  RecipientPersonID: "RecipientPersonID",
  AdministratedByUID: "AdministratedByUID",
  RequestExpirationTime: "RequestExpirationTime",
  SourceID: "SourceID",
  ConfirmationEmailToRequester: "ConfirmationEmailToRequester",
  InvitationEmailToRequester: "InvitationEmailToRequester",
  InvitationEmailToRecipient: "InvitationEmailToRecipient",
  Priority: "Priority",
  IsActive: "IsActive"
}

function WaitlistEntryForm(props: { initialValue?: { [key: string]: any }; formInstance: FormInstance }) {
  const [Section, setSection] = useState<{ [key: string]: any }>()
  const [showAdministrators, setShowAdministrators] = useState(false)
  const [personNameToDisplay, setPersonNameToDisplay] = useState("")
  const [errorMessages, setErrorMessages] = useState<ISimplifiedApiErrorMessage[]>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  // useEffect(() => {
  //   if (props.SectionID) {
  //     getEntityById("Section", props.SectionID).then((x) => {
  //       if (x.success) setSection(x.data)
  //     })
  //   }
  // }, [props.SectionID])
  // useEffect(() => {
  //   if (props.WaitListEntry) {
  //     formInstance.setFieldsValue({ [fieldNames.SeatGroupID]: props.WaitListEntry.SeatGroupID })
  //     setPersonNameToDisplay(props.WaitListEntry.AccountName)
  //     formInstance.setFieldsValue({ [fieldNames.SourceID]: props.WaitListEntry.SourceID })
  //     formInstance.setFieldsValue({ [fieldNames.AdministratedByUID]: props.WaitListEntry.AdministratedByUID })
  //     formInstance.setFieldsValue({
  //       [fieldNames.ConfirmationEmailToRequester]: props.WaitListEntry.ConfirmationEmailToRequester
  //     })
  //     formInstance.setFieldsValue({
  //       [fieldNames.InvitationEmailToRequester]: props.WaitListEntry.InvitationEmailToRequester
  //     })
  //     formInstance.setFieldsValue({ [fieldNames.RequestExpirationTime]: props.WaitListEntry.RequestExpirationTime })
  //     formInstance.setFieldsValue({ [fieldNames.IsActive]: props.WaitListEntry.IsActive })
  //     formInstance.setFieldsValue({ [fieldNames.Priority]: props.WaitListEntry.Priority })
  //   } else {
  //     formInstance.setFieldsValue({ [fieldNames.SourceID]: DEFAULT_HIR_ADMIN_SOURCE_ID })
  //   }
  // }, [formInstance, props.WaitListEntry])

  return (
    <>
      <SectionLookup
        formInstance={props.formInstance}
        label="Section"
        fieldName="SectionID"
        defaultValue={props.initialValue && props.initialValue.SectionID}
      />

      {props.initialValue?.SectionID && (
        <FormDropDown
          label="Seat Group"
          formInstance={props.formInstance}
          fieldName={fieldNames.SeatGroupID}
          refLookupService={() => getSeatGroups({ SectionID: props.initialValue?.SectionID })}
          displayKey="Name"
          valueField="SeatGroupID"
          disabled={!!props.initialValue || !Section}
        />
      )}
      <Form.Item label="Managed By" labelCol={{ span: 6 }}>
        <Radio.Group
          disabled={!!props.initialValue}
          onChange={(value) => {
            if (value.target.value === "admin") setShowAdministrators(true)
            else setShowAdministrators(false)
          }}
        >
          <Radio value="self">Self Service</Radio>
          <Radio value="admin">By Admin</Radio>
        </Radio.Group>
      </Form.Item>
      {showAdministrators && (
        <FormDropDown
          label="Select Admin"
          formInstance={props.formInstance}
          disabled={!!props.initialValue}
          fieldName={fieldNames.AdministratedByUID}
          refLookupService={() => getAllUsers({})}
          displayKey="FormattedName"
          valueField="UserID"
        />
      )}
      <Form.Item className="hidden" name={fieldNames.RequesterPersonID}>
        <Input />
      </Form.Item>
      <Form.Item className="hidden" name={fieldNames.RecipientPersonID}>
        <Input />
      </Form.Item>
      <Form.Item className="hidden" name={fieldNames.AccountID}>
        <Input />
      </Form.Item>
      <PersonLookup
        label="Person"
        formInstance={props.formInstance}
        fieldName="RequesterPersonID"
        // onCloseModal={(persons?: Array<{ [key: string]: string }>) => {
        //   if (persons && persons.length > 0) {
        //     const person = persons[0]
        //     console.log(person)
        //     getAccountByPurchaserID({ PersonID: person.PersonID }).then((x) => {
        //       if (x.success) {
        //         formInstance.setFieldsValue({ [fieldNames.RequesterPersonID]: person.PersonID })
        //         formInstance.setFieldsValue({ [fieldNames.RecipientPersonID]: person.PersonID })
        //         formInstance.setFieldsValue({ [fieldNames.AccountID]: x.data.AccountID })
        //         setPersonNameToDisplay(person.PersonDescriptor)
        //       } else {
        //         setErrorMessages([{ message: "Selected Purchaser doesn't have an account, please select another one" }])
        //       }
        //     })
        //   }
        // }}
      />

      <Form.Item label="Student" labelCol={{ span: 6 }}>
        <Input readOnly value={personNameToDisplay} />
      </Form.Item>
      <Form.Item label="Account" labelCol={{ span: 6 }}>
        <Input readOnly value={personNameToDisplay} />
      </Form.Item>
      <Form.Item
        name={fieldNames.ConfirmationEmailToRequester}
        label="Send Waitlist Confirmation"
        valuePropName="checked"
        labelCol={{ span: 6 }}
      >
        <Switch
          disabled={!!props.WaitListEntry}
          aria-label="Send Waitlist Confirmation"
          defaultChecked={formInstance.getFieldValue(fieldNames.ConfirmationEmailToRequester)}
        />
      </Form.Item>
      <Form.Item
        name={fieldNames.InvitationEmailToRecipient}
        label="Send Registration Invitation"
        valuePropName="checked"
        labelCol={{ span: 6 }}
      >
        <Switch
          disabled={!!props.WaitListEntry}
          aria-label="Send Registration Invitation"
          defaultChecked={formInstance.getFieldValue(fieldNames.InvitationEmailToRecipient)}
        />
      </Form.Item>
      <Form.Item>
        <OldDropDown
          label="Select Priority"
          fieldName={fieldNames.Priority}
          searchFunc={() =>
            Promise.resolve({
              success: true,
              data: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
                { id: 10 }
              ],
              error: undefined,
              code: 200
            })
          }
          displayField="id"
          valueField="id"
          labelColumn={{ span: 6 }}
        ></OldDropDown>
      </Form.Item>
      <Form.Item className="hidden" name={fieldNames.RequestExpirationTime}>
        <Input />
      </Form.Item>
      <Form.Item label="Expiration" labelCol={{ span: 6 }}>
        <DatePicker
          format={DATE_FORMAT}
          onChange={(value, dateString) => {
            formInstance.setFieldsValue({ [fieldNames.RequestExpirationTime]: dateString })
          }}
        ></DatePicker>
      </Form.Item>
      <Form.Item name={fieldNames.IsActive} label="Is Active" valuePropName="checked" labelCol={{ span: 6 }}>
        <Switch aria-label="Is Active" defaultChecked={formInstance.getFieldValue(fieldNames.IsActive)} />
      </Form.Item>
      <OldDropDown
        label="Source"
        fieldName={fieldNames.SourceID}
        searchFunc={getSourceModule}
        displayField="Name"
        valueField="ID"
        labelColumn={{ span: 6 }}
        disabled={true}
      ></OldDropDown>
    </>
  )
}

export function WaitlistEntryFormOpenButton(props: { initialValues?: { [key: string]: any } }) {
  const [editMode] = useState(props.initialValues && Object.keys(props.initialValues).length > 0)
  const [loading] = useState(false)
  const [formInstance] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  const onFormSubmission = async () => {
    formInstance.validateFields().then((x) => {
      setApiCallInProgress(true)
      setErrorMessages([])
      const Params = formInstance.getFieldsValue()
      if (!!props.initialValues) {
        Params.WaitListEntryID = props.initialValues.WaitListEntryID
      }
      saveWaitListEntry(Params).then((x) => {
        setApiCallInProgress(false)
        if (x.success) {
          eventBus.publish(REFRESH_SECTION_WAITLIST_ENTRIES_PAGE)
          setShowModal(false)
        } else setErrorMessages(x.error)
      })
    })
  }

  return (
    <CustomFormModalOpenButton
      formTitle={editMode ? "Edit Waitlist Entry" : "Add Waitlist Entry"}
      customForm={<WaitlistEntryForm initialValue={props.initialValues} formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      errorMessages={errorMessages}
      buttonLabel={editMode ? "Edit" : "+ Add Waitlist Entry"}
      buttonProps={{ type: editMode ? "link" : "primary" }}
      showModal={showModal}
      setShowModal={(show: boolean) => setShowModal(show)}
    />
  )
}
