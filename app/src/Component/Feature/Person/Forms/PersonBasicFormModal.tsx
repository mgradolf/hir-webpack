import { Button, Form } from "antd"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { IPersonBasicFieldNames } from "~/Component/Feature/Person/Interfaces"
import PersonBasicForm from "~/Component/Feature/Person/Forms/CreateEdit/PersonBasicForm"
import { IconButton, iconType } from "~/Component/Common/Form/Buttons/IconButton"

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
  OtherName: "OtherName",
  IsConfidential: "IsConfidential"
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

export const BasicFormModalOpenButton = (props: { personData: { [key: string]: any }; iconType?: iconType }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {props.iconType ? (
        <IconButton
          iconType={props.iconType}
          toolTip={"Update Basic Profile Data"}
          onClick={() => setShowModal(true)}
        />
      ) : (
        <Button type="primary" onClick={() => setShowModal(true)}>
          Edit
        </Button>
      )}
      {showModal && <PersonBasicFormModal initialData={props.personData} closeModal={() => setShowModal(false)} />}
    </>
  )
}
