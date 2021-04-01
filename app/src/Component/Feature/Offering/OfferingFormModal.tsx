import React, { useState } from "react"
import { Form } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import OfferingCreateForm from "~/Component/Feature/Offering/Forms/OfferingCreateForm"
import { OFFERING_TRMINATION_TIME, PAYMENT_GATEWAY_ACCOUNT_ID_STUB, OFFERING_STATUS_CODE } from "~/utils/Constants"

interface IOfferingFormModalProps {
  initialData: { [key: string]: any }
  closeModal?: () => void
}

const fieldNames: IOfferingFieldNames = {
  OfferingID: "OfferingID",
  OfferingTypeID: "OfferingTypeID",
  OfferingCode: "OfferingCode",
  Name: "Name",
  Description: "Description",
  OrganizationID: "OrganizationID",
  IsQuickAdmit: "IsQuickAdmit",
  OfferingStatusCodeID: "OfferingStatusCodeID",
  OfferingStatusReleaseID: "OfferingStatusReleaseID",
  DefaultSectionTypeID: "DefaultSectionTypeID",
  RecurrenceRule: "RecurrenceRule",
  StartTermID: "StartTermID",
  EndTermID: "EndTermID",
  CreationDate: "CreationDate",
  TerminationDate: "TerminationDate",
  URL: "URL",
  HasApprovalProcess: "HasApprovalProcess",
  CourseID: "CourseID",
  EffectiveCreationDate: "EffectiveCreationDate",
  EffectiveTerminationDate: "EffectiveTerminationDate",
  SubmitInquiryToUserID: "SubmitInquiryToUserID",
  OfferingUsageType: "OfferingUsageType",
  PaymentGatewayAccountID: "PaymentGatewayAccountID"
}

export function OfferingFormModal(props: IOfferingFormModalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({
    ...props.initialData,
    OfferingTypes: true,
    HasApprovalProcess: true,
    OfferingStatusCodeID: OFFERING_STATUS_CODE.PRELIMINARY,
    PaymentGatewayAccountID: PAYMENT_GATEWAY_ACCOUNT_ID_STUB,
    ChooseStartDate: true,
    ChooseEndDate: OFFERING_TRMINATION_TIME.DATE
  })

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <OfferingCreateForm
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}
