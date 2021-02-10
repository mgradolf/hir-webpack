import { Form } from "antd"
import React, { useEffect, useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { IPersonFieldNames } from "~/Component/Person/Interfaces"
import PersonForm from "~/Component/Person/CreateEdit/PersonForm"
import { getPersonDetails } from "~/ApiServices/Service/PersonService"

interface IPersonFormModalProps {
  PersonID?: number
  closeModal?: () => void
}

const fieldNames: IPersonFieldNames = {
  Roles: "Roles",
  FirstName: "FirstName",
  LastName: "LastName",
  Birthday: "Birthday",
  EmailAddress: "EmailAddress",
  TelephoneNumber: "TelephoneNumber",
  AddressLine1: "AddressLine1",
  AddressLine2: "AddressLine2",
  AddressLine3: "AddressLine3",
  Locality: "Locality",
  PostalCode: "PostalCode",
  RegionCodeID: "RegionCodeID",
  CountryCodeID: "CountryCodeID"
}

export default function PersonFormModal(props: IPersonFormModalProps) {
  const [formInstance] = Form.useForm()
  const [editMode, setEditMode] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue, setInitialFormValue] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    ;(async () => {
      if (props.PersonID) {
        const response = await getPersonDetails({ PersonID: props.PersonID })
        setEditMode(true)
        if (response && response.success) {
          Object.keys(response.data[0]).forEach((x) => {
            formInstance.setFieldsValue({ [x]: response.data[x] })
          })
          setInitialFormValue(response.data[0])
        } else {
          if (props.closeModal) {
            props.closeModal()
          }
        }
      }
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <PersonForm
        editMode={editMode}
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}
