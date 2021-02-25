import { Button, Form } from "antd"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { IPersonBasicFieldNames } from "~/Component/Person/Interfaces"
import PersonBasicForm from "~/Component/Person/Forms/CreateEdit/PersonBasicForm"

interface IPersonBasicFormModalProps {
  initialData: { [key: string]: any }
  closeModal?: () => void
}

const fieldNames: IPersonBasicFieldNames = {
  PersonID: "PersonID",
  Prefix: "Prefix",
  FirstName: "FirstName",
  LastName: "LastName",
  Suffix: "Suffix",
  MiddleName: "MiddleName",
  MaidenName: "MaidenName",
  OtherName: "OtherName"
}

function PersonBasicFormModal(props: IPersonBasicFormModalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>(props.initialData)

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <PersonBasicForm
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}

export const BasicFormModalOpenButton = (props: { personData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="ghost" onClick={() => setShowModal && setShowModal(true)}>
          Edit
        </Button>
      )}
      {showModal && <PersonBasicFormModal initialData={props.personData} closeModal={() => setShowModal(false)} />}
    </>
  )
}
