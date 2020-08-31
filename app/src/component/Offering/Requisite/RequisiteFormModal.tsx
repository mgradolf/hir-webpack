import * as React from "react"
import { useEffect, useState } from "react"
import { Form, Typography } from "antd"
import Modal from "~/component/Modal"
import RequisiteGroupForm from "~/component/Offering/Requisite/RequisiteGroupForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateOfferingPrerequisiteGroupModal } from "~/store/ModalState"
import { createRequisiteOfferingGroup, updateRequisiteOfferingGroup } from "~/ApiServices/Service/OfferingService"
import { getOfferingRequisiteGroupById } from "~/ApiServices/Service/EntityService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import EventBus from "~/utils/EventBus"
import { REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventList"

interface IOfferingRequisiteGroupProps {
  offeringID: number
  requisiteGroupID?: number
  closeOfferingRequisiteGroupModal?: () => void
}

function OfferingRequisiteGroupFormModal({
  closeOfferingRequisiteGroupModal,
  requisiteGroupID,
  offeringID
}: IOfferingRequisiteGroupProps) {
  const [initialFormValue, setInitialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [offeringARequisiteGroupLoading, setOfferingARequisiteGroupLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (closeOfferingRequisiteGroupModal) {
      closeOfferingRequisiteGroupModal()
    }
    console.log("initialFormValue ", initialFormValue)
  }

  const handleOk = async () => {
    console.log(formInstance.getFieldsValue())
    const validationPassed = await formInstance.validateFields()
    console.log("validationPassed ", validationPassed)
    const params = formInstance.getFieldsValue()

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = requisiteGroupID
      ? updateRequisiteOfferingGroup
      : createRequisiteOfferingGroup

    setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    setApiCallInProgress(false)

    if (response && response.success) {
      formInstance.resetFields()
      EventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
      handleCancel()
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    console.log("RequisiteGroupID ", requisiteGroupID)

    if (requisiteGroupID) {
      ;(async () => {
        setOfferingARequisiteGroupLoading(true)
        const response = await getOfferingRequisiteGroupById(requisiteGroupID)

        if (response && response.success) {
          setInitialFormValue(response.data)
        } else {
          if (closeOfferingRequisiteGroupModal) {
            closeOfferingRequisiteGroupModal()
          }
        }
        setOfferingARequisiteGroupLoading(false)
      })()
    }
  }, [requisiteGroupID, closeOfferingRequisiteGroupModal])

  return (
    <Modal
      showModal={true}
      width="800px"
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
            onFormSubmission={handleOk}
          />
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeOfferingRequisiteGroupModal: () => dispatch(showCreateOfferingPrerequisiteGroupModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(OfferingRequisiteGroupFormModal)
