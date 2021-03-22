import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import PersonMergeForm from "~/Component/Person/Forms/CreateEdit/PersonMergeForm"
import { Button } from "antd"

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
        <Button type="link" onClick={() => setShowModal && setShowModal(true)}>
          Merge
        </Button>
      )}
      {showModal && <PersonMergeFormModal PrimaryPerson={props.personData} closeModal={() => setShowModal(false)} />}
    </>
  )
}
