import { Button, Form } from "antd"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { IPersonAddressFieldNames } from "~/Component/Person/Interfaces"
import PersonAddressForm from "~/Component/Person/Forms/CreateEdit/PersonAddressForm"

interface IPersonAddressFormModalProps {
  initialData: { [key: string]: any }
  closeModal?: () => void
}

const fieldNames: IPersonAddressFieldNames = {
  PersonID: "PersonID",
  AddressTypeID: "AddressTypeID",
  PersonAddressID: "PersonAddressID",
  AddressLine1: "AddressLine1",
  AddressLine2: "AddressLine2",
  AddressLine3: "AddressLine3",
  Locality: "Locality",
  PostalCode: "PostalCode",
  RegionCodeID: "RegionCodeID",
  CountryCodeID: "CountryCodeID",
  IsConfidential: "IsConfidential"
}

function PersonAddressFormModal(props: IPersonAddressFormModalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>(props.initialData)

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <PersonAddressForm
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}

export const AddressFormModalOpenButton = (props: { personData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          Add
        </Button>
      )}
      {showModal && <PersonAddressFormModal initialData={props.personData} closeModal={() => setShowModal(false)} />}
    </>
  )
}
