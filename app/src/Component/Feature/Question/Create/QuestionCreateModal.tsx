import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import QuestionCreateForm from "~/Component/Question/Create/QuestionCreateForm"
import { Form } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { createQuestion, addTagQuestions } from "~/ApiServices/Service/QuestionService"
import { eventBus, REFRESH_QUESTION_PAGE } from "~/utils/EventBus"

interface IQuestionModal {
  closeModal?: () => void
  EventID?: number
  TagID?: number
}

export function QuestionCreateModal(props: IQuestionModal) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const onFormSubmission = (Params: any) => {
    Params.PreferenceValueTypeID = Number(Params.PreferenceValueTypeID)
    Params.OrganizationID = Number(Params.OrganizationID)
    setErrorMessages([])
    setApiCallInProgress(true)
    createQuestion(Params).then((x) => {
      setApiCallInProgress(false)
      if (x.success) {
        addTagQuestions({
          Questions: [{ PreferenceDefID: x.data.PreferenceDefID, TagID: props.TagID, EventID: props.EventID }]
        }).then((y) => {
          if (y.success) {
            eventBus.publish(REFRESH_QUESTION_PAGE)
            props.closeModal && props.closeModal()
          } else {
            setErrorMessages(y.error)
          }
        })
      } else {
        setErrorMessages(x.error)
      }
    })
  }
  return (
    <Modal
      width="800px"
      loading={false}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <QuestionCreateForm
            formInstance={formInstance}
            errorMessages={errorMessages}
            setErrorMessages={setErrorMessages}
            handleCancel={props.closeModal}
            onFormSubmission={onFormSubmission}
          />
        </>
      }
    />
  )
}
