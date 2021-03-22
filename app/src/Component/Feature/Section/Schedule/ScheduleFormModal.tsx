import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useState } from "react"
import ScheduleForm from "~/Component/Section/Schedule/ScheduleForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateSectionScheduleModal } from "~/Store/ModalState"
import { Form } from "antd"
import { IScheduleFieldNames } from "~/Component/Section/Interfaces"

interface IScheduleProps {
  scheduleIds?: number
  sectionId: number
  closeScheduleModal?: () => void
}

const fieldNames: IScheduleFieldNames = {
  SectionID: "SectionID",
  MeetingTypeID: "MeetingTypeID",
  StartTime: "StartTime",
  EndTime: "EndTime",
  MeetingDate: "MeetingDate",
  Occurrences: "Occurrences",
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fir",
  Sat: "Sat",
  Sun: "Sun",
  Frequency: "Frequency",
  ExcludeHoliday: "ExcludeHoliday"
}

function CreateNewSchedule({ scheduleIds, closeScheduleModal, sectionId }: IScheduleProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})

  const handleCancel = () => {
    if (closeScheduleModal) {
      closeScheduleModal()
    }
  }

  return (
    <Modal
      showModal={true}
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <ScheduleForm
            sectionId={sectionId}
            scheduleIds={scheduleIds}
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
  return { closeScheduleModal: () => dispatch(showCreateSectionScheduleModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(CreateNewSchedule)
