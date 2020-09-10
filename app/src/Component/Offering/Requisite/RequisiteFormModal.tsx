import * as React from "react"
import { useEffect, useState } from "react"
import { Form, Typography } from "antd"
import Modal from "~/Component/Modal"
import RequisiteGroupForm from "~/Component/Offering/Requisite/RequisiteGroupForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateOfferingPrerequisiteGroupModal } from "~/store/ModalState"
import { getOfferingRequisiteGroupById } from "~/ApiServices/Service/EntityService"

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
  const [initialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [offeringARequisiteGroupLoading, setOfferingARequisiteGroupLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (closeOfferingRequisiteGroupModal) {
      closeOfferingRequisiteGroupModal()
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
          if (closeOfferingRequisiteGroupModal) {
            closeOfferingRequisiteGroupModal()
          }
        }
        setOfferingARequisiteGroupLoading(false)
      })()
    }
  }, [requisiteGroupID, closeOfferingRequisiteGroupModal, formInstance])

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
            setApiCallInProgress={setApiCallInProgress}
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
