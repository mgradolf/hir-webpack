import { Form } from "antd"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { PersonDegreeForm } from "~/Component/Feature/Person/Forms/CreateEdit/PersonDegreeForm"

interface IPersonDegreeFormModalProps {
  initialData: { [key: string]: any }
  closeModal?: () => void
}

export function PersonDegreeFormModal(props: IPersonDegreeFormModalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>(props.initialData)

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <PersonDegreeForm
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}

export const DegreeFormModalOpenButton = (props: { initialData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <IconButton toolTip="Add Degree" iconType="create" onClick={() => setShowModal(true)} />
      {showModal && <PersonDegreeFormModal initialData={props.initialData} closeModal={() => setShowModal(false)} />}
    </>
  )
}
