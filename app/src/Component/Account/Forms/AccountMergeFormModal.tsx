import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import AccountMergeForm from "~/Component/Account/Forms/AccountMergeForm"
import { Button } from "antd"

interface IAccountMergeFormModalProps {
  PrimaryAccount: { [key: string]: any }
  closeModal?: () => void
}

export default function AccountMergeFormModal(props: IAccountMergeFormModalProps) {
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>(props.PrimaryAccount)

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <AccountMergeForm
        initialFormValue={initialFormValue}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}

export const AccountMergeFormModalOpenButton = (props: { accountData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" style={{ marginLeft: "10px" }} onClick={() => setShowModal && setShowModal(true)}>
          Merge
        </Button>
      )}
      {showModal && <AccountMergeFormModal PrimaryAccount={props.accountData} closeModal={() => setShowModal(false)} />}
    </>
  )
}
