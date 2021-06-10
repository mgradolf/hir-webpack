import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import PersonMergeForm from "~/Component/Feature/Person/Forms/CreateEdit/PersonMergeForm"
import { Button, Tooltip } from "antd"
import { MergeCellsOutlined } from "@ant-design/icons"

interface IPersonMergeFormModalProps {
  PrimaryPerson: { [key: string]: any }
  closeModal?: () => void
}

export default function PersonMergeFormModal(props: IPersonMergeFormModalProps) {
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>(props.PrimaryPerson)

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <PersonMergeForm
        initialFormValue={initialFormValue}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}

export const PersonMergeFormModalOpenButton = (props: { personData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Tooltip title="Merge Person">
          <Button
            type="primary"
            style={{ marginRight: "5px" }}
            shape="circle"
            onClick={() => setShowModal && setShowModal(true)}
            icon={<MergeCellsOutlined />}
          />
        </Tooltip>
      )}
      {showModal && <PersonMergeFormModal PrimaryPerson={props.personData} closeModal={() => setShowModal(false)} />}
    </>
  )
}
