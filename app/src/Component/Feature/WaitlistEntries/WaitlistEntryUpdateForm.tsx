import React, { useState } from "react"
import { Col, Row } from "antd"
import { DEFAULT_HIR_ADMIN_SOURCE_ID } from "~/utils/Constants"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInstance } from "antd/lib/form"
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

export function WaitlistEntryUpdateForm(props: { initialValue?: { [key: string]: any }; formInstance: FormInstance }) {
  const [showAdministrators, setShowAdministrators] = useState(
    props.initialValue && props.initialValue.ManagedBy === "admin"
  )

  return (
    <Row>
      <Col xs={24} sm={24} md={12}>
        <FormInput label="SectionID" formInstance={props.formInstance} fieldName="SectionID" hidden />
        <FormInput label="Section" formInstance={props.formInstance} fieldName="SectionNumber" disabled />
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
          disabled
        />
        <FormInput label="PurchaserPersonID" formInstance={props.formInstance} fieldName="RequesterPersonID" hidden />
        <FormInput label="Purchaser" formInstance={props.formInstance} fieldName="PurchaserName" disabled />
        <FormInput label="StudentID" formInstance={props.formInstance} fieldName="StudentID" hidden />
        <FormInput label="Student" formInstance={props.formInstance} fieldName="StudentName" disabled />
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
        <FormMultipleRadio
          label="Is Active"
          fieldName={fieldNames.IsActive}
          formInstance={props.formInstance}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <FormInput label="SeatGroupID" formInstance={props.formInstance} fieldName={fieldNames.SeatGroupID} hidden />
        <FormInput label="Seat Group" formInstance={props.formInstance} fieldName="SeatGroupName" disabled />
        {showAdministrators && (
          <FormDropDown
            disabled
            label="Select Admin"
            formInstance={props.formInstance}
            fieldName={fieldNames.AdministratedByUID}
            refLookupService={() => getAllUsers({})}
            displayKey="FormattedName"
            valueKey="UserID"
          />
        )}
        <FormInput label="AccountID" formInstance={props.formInstance} fieldName="AccountID" hidden />
        <FormInput label="Account" formInstance={props.formInstance} fieldName="AccountName" disabled />
        <FormMultipleRadio
          label="Send Invitation"
          fieldName={fieldNames.InvitationEmailToRequester}
          formInstance={props.formInstance}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
          disabled
        />
        <FormDatePicker
          label="Expiration"
          fieldName={fieldNames.RequestExpirationTime}
          formInstance={props.formInstance}
        />
        <FormDropDown
          label="Source"
          fieldName={fieldNames.SourceID}
          defaultValue={DEFAULT_HIR_ADMIN_SOURCE_ID}
          refLookupService={getSourceModule}
          displayKey="Name"
          valueKey="ID"
          formInstance={props.formInstance}
          disabled
        />
      </Col>
    </Row>
  )
}
