import { Form } from "antd"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { IPersonAccountFieldNames } from "~/Component/Person/Interfaces"
import PersonAccountForm from "~/Component/Person/CreateEdit/PersonAccountForm"
import { ACCOUNT_AFFILIATION_STATUS_ACTIVE } from "~/utils/Constants"

interface IPersonAccountFormModalProps {
  initialData: { [key: string]: any }
  closeModal?: () => void
}

const fieldNames: IPersonAccountFieldNames = {
  AccountAffiliationID: "AccountAffiliationID",
  AccountID: "AccountID",
  AccountName: "AccountName",
  PersonID: "PersonID",
  AffiliationRoleTypeID: "AffiliationRoleTypeID",
  StatusID: "StatusID",
  IsContactShared: "IsContactShared",
  AsnwerList: "AnswerList"
}

export default function PersonAccountFormModal(props: IPersonAccountFormModalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({
    ...props.initialData,
    PersonID: props.initialData.PersonID,
    StatusID: ACCOUNT_AFFILIATION_STATUS_ACTIVE
  })

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <PersonAccountForm
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}
