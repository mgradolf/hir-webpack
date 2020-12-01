import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useEffect, useState } from "react"
import SeatGroupForm from "~/Component/Section/SeatGroup/SeatGroupForm"
import { getSeatGroupById } from "~/ApiServices/Service/EntityService"
import { Form } from "antd"
import { ISectionSeatGroupFieldNames } from "~/Component/Section/Interfaces"

interface ICreateNewSeatGroupProps {
  seatgroupId?: number
  sectionId: number
  programId?: number
  programCode?: string
  isDefault?: boolean
  closeModal?: () => void
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

export default function CreateOrUpdateSeatGroup({
  seatgroupId,
  closeModal,
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
    if (closeModal) {
      closeModal()
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
          if (closeModal) {
            closeModal()
          }
        }
        setSectionSeatGroupLoading(false)
      })()
    }
  }, [seatgroupId, closeModal, formInstance])

  return (
    <Modal
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
