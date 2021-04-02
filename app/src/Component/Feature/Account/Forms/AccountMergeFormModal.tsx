import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import AccountMergeForm from "~/Component/Feature/Account/Forms/AccountMergeForm"
import { Button, Tooltip } from "antd"
import { MergeCellsOutlined } from "@ant-design/icons"

interface IAccountMergeFormModalProps {
  PrimaryAccount: { [key: string]: any }
  closeModal?: () => void
}

function AccountMergeFormModal(props: IAccountMergeFormModalProps) {
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
        <Tooltip title="Merge Account">
          <Button
            type="primary"
            style={{ marginLeft: "10px", marginRight: "10px" }}
            shape="circle"
            onClick={() => setShowModal && setShowModal(true)}
            icon={<MergeCellsOutlined />}
          />
        </Tooltip>
      )}
      {showModal && <AccountMergeFormModal PrimaryAccount={props.accountData} closeModal={() => setShowModal(false)} />}
    </>
  )
}
