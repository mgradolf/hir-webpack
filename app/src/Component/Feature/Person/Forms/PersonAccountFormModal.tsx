import React, { useState } from "react"
import { Form } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { IPersonAccountFieldNames } from "~/Component/Feature/Person/Interfaces"
import PersonAccountForm from "~/Component/Feature/Person/Forms/CreateEdit/PersonAccountForm"
import { ACCOUNT_AFFILIATION_STATUS_ACTIVE } from "~/utils/Constants"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface IPersonAccountFormModalProps {
  initialData: { [key: string]: any }
  closeModal?: () => void
  zIndex?: number
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

export function PersonAccountFormModal(props: IPersonAccountFormModalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({
    ...props.initialData,
    PersonID: props.initialData.PersonID,
    StatusID: ACCOUNT_AFFILIATION_STATUS_ACTIVE
  })

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress} zIndex={props.zIndex}>
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

export const AccountRelationFormModalOpenButton = (props: { personData: { [key: string]: any }; zIndex?: number }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && <IconButton toolTip="Add Relation" iconType="create" onClick={() => setShowModal(true)} />}
      {showModal && (
        <PersonAccountFormModal
          initialData={props.personData}
          closeModal={() => setShowModal(false)}
          zIndex={props.zIndex}
        />
      )}
    </>
  )
}
