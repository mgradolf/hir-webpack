import * as React from "react"
import { Form, Typography } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import ApprovalForm from "~/Component/Feature/OfferingApproval/ApprovalForm"

interface IOfferingApprovalProps {
  offeringID: number
  statusCode: string
  closeModal?: () => void
}

export default function OfferingApprovalFormModal({ closeModal, offeringID, statusCode }: IOfferingApprovalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  return (
    <Modal
      width="1000px"
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
          <ApprovalForm
            offeringID={offeringID}
            statusCode={statusCode}
            formInstance={formInstance}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
          />
        </>
      }
    />
  )
}
