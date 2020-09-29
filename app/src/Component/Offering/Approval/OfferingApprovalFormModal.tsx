import * as React from "react"
import { Form, Typography } from "antd"
import Modal from "~/Component/Common/Modal"
import { useState } from "react"
import ApprovalForm from "~/Component/Offering/Approval/ApprovalForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showOfferingApprovalModal } from "~/Store/ModalState"

interface IOfferingApprovalProps {
  offeringID: number
  closeOfferingApprovalModal?: () => void
}

function OfferingApproval({ closeOfferingApprovalModal, offeringID }: IOfferingApprovalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (closeOfferingApprovalModal) {
      closeOfferingApprovalModal()
    }
  }

  return (
    <Modal
      showModal={true}
      width="800px"
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
            formInstance={formInstance}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
          />
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeOfferingApprovalModal: () => dispatch(showOfferingApprovalModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(OfferingApproval)
