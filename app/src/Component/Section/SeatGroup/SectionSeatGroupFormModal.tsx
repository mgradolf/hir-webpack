import * as React from "react"
import Modal from "~/Component/Modal"
import { useEffect, useState } from "react"
import SeatGroupForm from "~/Component/Section/SeatGroup/SeatGroupForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateSectionSeatGroupModal } from "~/store/ModalState"
import { getSeatGroupById } from "~/ApiServices/Service/EntityService"
import { Form } from "antd"
import { ISectionSeatGroupFieldNames } from "~/Component/Section/Interfaces"
import { AppState } from "~/store"

interface ICreateNewSeatGroupProps {
  seatgroupId?: number
  sectionId: number
  programId?: number
  programCode?: string
  isDefault?: boolean
  closeCreateSeatGroupModal?: () => void
}

const fieldNames: ISectionSeatGroupFieldNames = {
  Name: "Name",
  NumberOfSeats: "NumberOfSeats",
  EstimatedEnrollment: "EstimatedEnrollment",
  DueDatePolicyID: "DueDatePolicyID",
  WaitListEnabled: "WaitListEnabled",
  SectionID: "SectionID",
  SeatGroupID: "SeatGroupID",
  ProgramID: "ProgramID",
  ProgramCode: "ProgramCode"
}

function CreateNewSeatGroup({
  seatgroupId,
  closeCreateSeatGroupModal,
  sectionId,
  programId,
  programCode,
  isDefault
}: ICreateNewSeatGroupProps) {
  const [formInstance] = Form.useForm()
  const [sectionSeatGroupLoading, setSectionSeatGroupLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})

  const handleCancel = () => {
    if (closeCreateSeatGroupModal) {
      closeCreateSeatGroupModal()
    }
  }

  useEffect(() => {
    if (seatgroupId) {
      ;(async () => {
        setSectionSeatGroupLoading(true)
        const response = await getSeatGroupById(seatgroupId)
        if (response && response.success) {
          formInstance.setFieldsValue(response.data)
        } else {
          if (closeCreateSeatGroupModal) {
            closeCreateSeatGroupModal()
          }
        }
        setSectionSeatGroupLoading(false)
      })()
    }
  }, [seatgroupId, closeCreateSeatGroupModal, formInstance])

  return (
    <Modal
      showModal={true}
      width="800px"
      loading={sectionSeatGroupLoading}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <SeatGroupForm
            sectionId={sectionId}
            seatgroupId={seatgroupId}
            programId={programId}
            programCode={programCode}
            isDefault={isDefault}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
            initialFormValue={initialFormValue}
            fieldNames={fieldNames}
            formInstance={formInstance}
          />
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeCreateSeatGroupModal: () => dispatch(showCreateSectionSeatGroupModal(false)) }
}

export default connect((state: AppState) => {
  const { programId, programCode, isDefault } = state.modalState.createSectionSeatGroupModal.config
  return { programId, programCode, isDefault }
}, mapDispatchToProps)(CreateNewSeatGroup)
