import * as React from "react"
import { Form, Typography } from "antd"
import Modal from "~/component/Modal"
import { useState } from "react"
import ApprovalForm from "~/component/Offering/Approval/ApprovalForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showOfferingApprovalModal } from "~/store/ModalState"
import { setApprovalStatus } from "~/ApiServices/Service/OfferingService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_OFFERING_APPROVAL_PAGE } from "~/utils/EventBus"

interface IOfferingApprovalProps {
  offeringID: number
  closeOfferingApprovalModal?: () => void
}

function OfferingApproval({ closeOfferingApprovalModal, offeringID }: IOfferingApprovalProps) {
  const [initialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [offeringApprovalLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (closeOfferingApprovalModal) {
      closeOfferingApprovalModal()
    }
  }

  const handleOk = async () => {
    // const validationPassed = await formInstance.validateFields()
    const params = formInstance.getFieldsValue()

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = setApprovalStatus

    setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    setApiCallInProgress(false)

    if (response && response.success) {
      formInstance.resetFields()
      eventBus.publish(REFRESH_OFFERING_APPROVAL_PAGE)
      handleCancel()
    } else {
      console.log(response)
    }
  }

  return (
    <Modal
      showModal={true}
      width="800px"
      loading={offeringApprovalLoading}
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
            initialFormValue={initialFormValue}
            formInstance={formInstance}
            handleCancel={handleCancel}
            onFormSubmission={handleOk}
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
