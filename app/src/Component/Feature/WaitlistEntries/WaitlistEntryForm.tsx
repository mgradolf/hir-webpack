import React, { useEffect, useState } from "react"
import { Form, Input, message } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { getSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import { CREATE_SUCCESSFULLY, DEFAULT_HIR_ADMIN_SOURCE_ID, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
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
import { Redirect } from "react-router"
import { WaitlistEntryUpdateForm } from "~/Component/Feature/WaitlistEntries/WaitlistEntryUpdateForm"
import { findWaitListEntries } from "~/ApiServices/BizApi/registration/waitlistIF"

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
          setAccount(x.data)
          props.formInstance.setFieldsValue({ [fieldNames.AccountID]: x.data.AccountID })
        }
      })
    } else {
      setAccount(undefined)
    }
  }, [purchaser, props.formInstance])

  return (
    <>
      {SectionID && (
        <>
          <FormInput label="SectionID" fieldName="SectionID" formInstance={props.formInstance} hidden />
          <FormInput label="Section" fieldName="SectionNumber" formInstance={props.formInstance} disabled />
        </>
      )}
      {!SectionID && (
        <SectionLookup
          formInstance={props.formInstance}
          label="Section"
          fieldName="SectionID"
          onSelectedItems={(Sections: any[]) => {
            if (Sections.length > 0) {
              setSectionID(Sections[0].SectionID)
            } else {
              setSectionID(undefined)
            }
          }}
          rules={[{ required: true, message: "Section is required" }]}
        />
      )}
      {SectionID && (
        <FormDropDown
          label="Seat Group"
          formInstance={props.formInstance}
          fieldName={fieldNames.SeatGroupID}
          refLookupService={() => getSeatGroups({ SectionID })}
          displayKey="Name"
          valueKey="SeatGroupID"
          rules={[{ required: true, message: "Seat Group is required" }]}
        />
      )}
      <FormMultipleRadio
        label="Managed By"
        formInstance={props.formInstance}
        fieldName="ManagedBy"
        onChangeCallback={(Params: any) => {
          if (Params === "admin") setShowAdministrators(true)
          else setShowAdministrators(false)
        }}
        options={[
          { label: "Self Service", value: "self" },
          { label: "By Admin", value: "admin" }
        ]}
      />
      {showAdministrators && (
        <FormDropDown
          label="Select Admin"
          formInstance={props.formInstance}
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
          rules={[{ required: true, message: "Student is required" }]}
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
        fieldName={fieldNames.InvitationEmailToRequester}
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
        options={[
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 },
          { label: "5", value: 5 },
          { label: "6", value: 6 },
          { label: "7", value: 7 },
          { label: "8", value: 8 },
          { label: "9", value: 9 },
          { label: "10", value: 10 }
        ]}
      />

      <FormDatePicker
        label="Expiration"
        fieldName={fieldNames.RequestExpirationTime}
        formInstance={props.formInstance}
      />
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

export function WaitlistEntryFormOpenButton(props: {
  SectionID?: number
  SectionNumber?: string
  initialValues?: { [key: string]: any }
  editMode: boolean
}) {
  const [loading] = useState(false)
  const [formInstance] = Form.useForm()
  const [redirectAfterCreate, setRedirectAfterCreate] = useState<string>()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues, setInitialValue] = useState<{ [key: string]: any }>(
    props.initialValues || {
      Priority: 5,
      IsActive: true,
      ManagedBy: "self",
      ConfirmationEmailToRequester: true,
      InvitationEmailToRequester: true
    }
  )

  useEffect(() => {
    if (props.SectionID) {
      initialValues["SectionID"] = props.SectionID
      initialValues["SectionNumber"] = props.SectionNumber
    }
    if (props.initialValues && props.initialValues.WaitListEntryID !== undefined) {
      findWaitListEntries({ WaitListEntryID: props.initialValues.WaitListEntryID }).then((response) => {
        setInitialValue({
          ...response.data[0],
          ManagedBy: response.data[0].AdministratedByUID !== null ? "admin" : "self"
        })
      })
    }
    setErrorMessages([])
    // eslint-disable-next-line
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
            if (props.SectionID) {
              eventBus.publish("REFRESH_SECTION_WAITLIST_ENTRIES_PAGE_1")
              closeModal()
            } else if (props.editMode) {
              message.success(UPDATE_SUCCESSFULLY)
              eventBus.publish(REFRESH_PAGE)
              closeModal()
            } else {
              message.success(CREATE_SUCCESSFULLY)
              closeModal()
              setRedirectAfterCreate(`/waitlist/${x.data.WaitListEntryID}`)
            }
          } else setErrorMessages(x.error)
        })
      })
      .catch((error) => {
        console.log("error in WaitlistEntryForm validation")
        setApiCallInProgress(false)
      })
  }

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <CustomFormModalOpenButton
        formTitle={props.editMode ? "Edit Waitlist Entry" : "Add Waitlist Entry"}
        customForm={
          props.editMode ? (
            <WaitlistEntryUpdateForm initialValue={initialValues} formInstance={formInstance} />
          ) : (
            <WaitlistEntryForm
              SectionID={props.SectionID}
              initialValue={props.initialValues}
              formInstance={formInstance}
            />
          )
        }
        formInstance={formInstance}
        onFormSubmission={onFormSubmission}
        initialValues={initialValues}
        apiCallInProgress={apiCallInProgress}
        loading={loading}
        errorMessages={errorMessages}
        iconType={props.editMode ? "edit" : "create"}
        buttonLabel={props.editMode ? "Edit Waitlist Entry" : "Add Waitlist Entry"}
        buttonProps={{ type: "primary" }}
      />
    </>
  )
}
