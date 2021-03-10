import React, { useState } from "react"
import { Button, Form } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { IAccountContactFieldNames } from "~/Component/Account/Interfaces"
import { ACCOUNT_AFFILIATION_STATUS_ACTIVE } from "~/utils/Constants"
import AccountContactForm from "~/Component/Account/Forms/AccountContactForm"

interface IAccountContactFormModalProps {
  initialData: { [key: string]: any }
  closeModal?: () => void
}

const fieldNames: IAccountContactFieldNames = {
  AccountAffiliationID: "AccountAffiliationID",
  AccountID: "AccountID",
  PersonID: "PersonID",
  FirstName: "FirstName",
  LastName: "LastName",
  Birthday: "Birthday",
  EmailAddress: "EmailAddress",
  AffiliationRoleTypeID: "AffiliationRoleTypeID",
  StatusID: "StatusID",
  IsContactShared: "IsContactShared",
  IsPrimaryAccountAffiliation: "IsPrimaryAccountAffiliation",
  ERPID: "ERPID",
  AsnwerList: "AnswerList"
}

export function AccountContactFormModal(props: IAccountContactFormModalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({
    ...props.initialData,
    PersonID: props.initialData.PersonID,
    StatusID: ACCOUNT_AFFILIATION_STATUS_ACTIVE
  })

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <AccountContactForm
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}

export const AccountContactFormModalOpenButton = (props: { accountData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          + Add Contact
        </Button>
      )}
      {showModal && <AccountContactFormModal initialData={props.accountData} closeModal={() => setShowModal(false)} />}
    </>
  )
}
