import React, { useEffect, useState } from "react"
import { Form, Input } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { getSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import { DEFAULT_HIR_ADMIN_SOURCE_ID } from "~/utils/Constants"
import { eventBus, REFRESH_SECTION_WAITLIST_ENTRIES_PAGE } from "~/utils/EventBus"
import { saveWaitListEntry } from "~/ApiServices/Service/WaitlistEntryService"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInstance } from "antd/lib/form"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { getAccountAffiliation, getAccountByPurchaserID, pushAccount } from "~/ApiServices/Service/AccountService"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { AccountFormMeta } from "~/Component/Feature/Account/FormMeta/AccountFormMeta"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"

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

function WaitlistEntryForm(props: {
  SectionID?: number
  initialValue?: { [key: string]: any }
  formInstance: FormInstance
}) {
  const [showAdministrators, setShowAdministrators] = useState(false)
  const [purchaser, setPurchaser] = useState<{ [key: string]: any }>()
  const [account, setAccount] = useState<{ [key: string]: any }>()
  const [SectionID, setSectionID] = useState(
    props.initialValue && props.initialValue.SectionID ? props.initialValue.SectionID : props.SectionID
  )
  useEffect(() => {
    if (purchaser) {
      getAccountByPurchaserID({ PersonID: purchaser.PersonID }).then((x) => {
        if (x.success) {
          console.log("setting account ", x.data)
          setAccount(x.data)
          props.formInstance.setFieldsValue({ [fieldNames.AccountID]: x.data.AccountID })
        }
      })
    } else {
      setAccount(undefined)
    }
  }, [purchaser, props.formInstance])
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
        defaultValue={SectionID}
        onSelectedItems={(Sections: any[]) => {
          if (Sections.length > 0) {
            setSectionID(Sections[0].SectionID)
          } else {
            setSectionID(undefined)
          }
        }}
        rules={[{ required: true, message: "Section is required" }]}
      />

      {SectionID && (
        <FormDropDown
          label="Seat Group"
          formInstance={props.formInstance}
          fieldName={fieldNames.SeatGroupID}
          refLookupService={() => getSeatGroups({ SectionID })}
          displayKey="Name"
          valueKey="SeatGroupID"
          disabled={!!props.initialValue}
          rules={[{ required: true, message: "Seat Group is required" }]}
        />
      )}
      <FormMultipleRadio
        label="Managed By"
        formInstance={props.formInstance}
        fieldName=""
        onChangeCallback={(Params: any) => {
          console.log(Params)
          if (Params && Params.target && Params.target.value === "admin") setShowAdministrators(true)
          else setShowAdministrators(false)
        }}
        options={[
          { label: "Self Service", value: "self" },
          { label: "By Admin", value: "admin" }
        ]}
      />
      {/* <Form.Item labelCol={{ span: 6 }}>
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
      </Form.Item> */}
      {showAdministrators && (
        <FormDropDown
          label="Select Admin"
          formInstance={props.formInstance}
          disabled={!!props.initialValue}
          fieldName={fieldNames.AdministratedByUID}
          refLookupService={() => getAllUsers({})}
          displayKey="FormattedName"
          valueKey="UserID"
        />
      )}

      <PersonLookup
        label="Purchaser"
        formInstance={props.formInstance}
        fieldName="RequesterPersonID"
        onSelectedItems={(persons) => {
          if (Array.isArray(persons) && persons.length > 0) {
            console.log("persons ", persons)
            setPurchaser(persons[0])
          } else {
            setPurchaser(undefined)
            setAccount(undefined)
          }
        }}
        rules={[{ required: true, message: "Purchaser is required" }]}

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

      {account && (
        <>
          <FormInput
            label="Account"
            fieldName="sdfd"
            defaultValue={account.AccountDescriptor}
            formInstance={props.formInstance}
            readOnly={true}
          />
          <Form.Item className="hidden" name={fieldNames.AccountID}>
            <Input />
          </Form.Item>
        </>
      )}
      {purchaser && !account && (
        <MetaDrivenFormModalOpenButton
          buttonLabel="+ Create Account"
          formTitle="Create Account"
          formMeta={AccountFormMeta}
          formMetaName="AccountFormMeta"
          formSubmitApi={pushAccount}
          initialFormValue={{ AllowToPayLater: "Not Allowed", DefaultWaitlistPriority: 5 }}
          defaultFormValue={{ AllowToPayLater: "Not Allowed", DefaultWaitlistPriority: 5 }}
          refreshEventName="REFRESH_PAGE"
        />
      )}
      {account && (
        <FormDropDown
          label="Student"
          formInstance={props.formInstance}
          fieldName="RecipientPersonID"
          displayKey="PersonName"
          valueKey="PersonID"
          refLookupService={() => getAccountAffiliation({ AccountID: account.AccountID })}
        />
      )}
      <FormMultipleRadio
        label="Send Waitlist Confirmation"
        fieldName={fieldNames.ConfirmationEmailToRequester}
        formInstance={props.formInstance}
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false }
        ]}
      />
      <FormMultipleRadio
        label="Send Registration Invitation"
        fieldName={fieldNames.InvitationEmailToRecipient}
        formInstance={props.formInstance}
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false }
        ]}
      />
      <FormDropDown
        label="Select Priority"
        fieldName={fieldNames.Priority}
        formInstance={props.formInstance}
        refLookupService={() =>
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
        displayKey="id"
        valueKey="id"
      />

      <FormDatePicker
        label="Expiration"
        fieldName={fieldNames.RequestExpirationTime}
        formInstance={props.formInstance}
      />
      {/* <Form.Item className="hidden" name={fieldNames.RequestExpirationTime}>
        <Input />
      </Form.Item>
      <Form.Item label="Expiration" labelCol={{ span: 6 }}>
        <DatePicker
          format={DATE_FORMAT}
          onChange={(value, dateString) => {
            props.formInstance.setFieldsValue({ [fieldNames.RequestExpirationTime]: dateString })
          }}
        ></DatePicker>
      </Form.Item> */}
      <FormMultipleRadio
        label="Is Active"
        fieldName={fieldNames.IsActive}
        formInstance={props.formInstance}
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false }
        ]}
      />
      <FormDropDown
        label="Source"
        fieldName={fieldNames.SourceID}
        defaultValue={DEFAULT_HIR_ADMIN_SOURCE_ID}
        refLookupService={getSourceModule}
        displayKey="Name"
        valueKey="ID"
        formInstance={props.formInstance}
        disabled={true}
      />
    </>
  )
}

export function WaitlistEntryFormOpenButton(props: { SectionID?: number; initialValues?: { [key: string]: any } }) {
  const [editMode] = useState(props.initialValues && Object.keys(props.initialValues).length > 0)
  const [loading] = useState(false)
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  useEffect(() => {
    setErrorMessages([])
  }, [])

  const onFormSubmission = async (closeModal: () => void) => {
    setApiCallInProgress(true)
    formInstance
      .validateFields()
      .then((x) => {
        setErrorMessages([])
        const Params = formInstance.getFieldsValue()
        if (!!props.initialValues) {
          Params.WaitListEntryID = props.initialValues.WaitListEntryID
        }
        saveWaitListEntry(Params).then((x) => {
          setApiCallInProgress(false)
          if (x.success) {
            eventBus.publish(REFRESH_SECTION_WAITLIST_ENTRIES_PAGE)
            closeModal()
          } else setErrorMessages(x.error)
        })
      })
      .catch((error) => {
        console.log("error in WaitlistEntryForm validation")
        setApiCallInProgress(false)
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
    />
  )
}
