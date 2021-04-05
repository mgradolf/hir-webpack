import * as React from "react"
import { useEffect, useState } from "react"
import { Form, Typography } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import RequisiteGroupForm from "~/Component/Feature/OfferingRequisite/RequisiteGroupForm"
import { getOfferingRequisiteGroupById } from "~/ApiServices/Service/EntityService"

interface IOfferingRequisiteGroupProps {
  offeringID: number
  requisiteGroupID?: number
  closeModal?: () => void
}

export default function OfferingRequisiteGroupFormModal({
  closeModal,
  requisiteGroupID,
  offeringID
}: IOfferingRequisiteGroupProps) {
  const [initialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [offeringARequisiteGroupLoading, setOfferingARequisiteGroupLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (requisiteGroupID) {
      ;(async () => {
        setOfferingARequisiteGroupLoading(true)
        const response = await getOfferingRequisiteGroupById(requisiteGroupID)

        if (response && response.success) {
          formInstance.setFieldsValue(response.data)
        } else {
          if (closeModal) {
            closeModal()
          }
        }
        setOfferingARequisiteGroupLoading(false)
      })()
    }
  }, [requisiteGroupID, closeModal, formInstance])

  return (
    <Modal
      width="1000px"
      loading={offeringARequisiteGroupLoading}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {errorMessages.length && (
            <ul>
              <li>
                {errorMessages.map((item) => {
                  return <Typography.Text type="danger">{item}</Typography.Text>
                })}
              </li>
            </ul>
          )}
          <RequisiteGroupForm
            requisiteGroupID={requisiteGroupID}
            offeringID={offeringID}
            formInstance={formInstance}
            initialFormValue={initialFormValue}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
          />
        </>
      }
    />
  )
}
