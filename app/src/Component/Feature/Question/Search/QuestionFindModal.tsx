import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import QuestionSearch from "~/Component/Feature/Question/Search/QuestionSearch"
import QuestionSearchResultTable from "~/Component/Feature/Question/Search/QuestionSearchResultTable"
import { addTagQuestions, searchQuestions } from "~/ApiServices/Service/QuestionService"
import { Button, Card } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { eventBus, REFRESH_QUESTION_PAGE } from "~/utils/EventBus"

interface IQuestionModal {
  closeModal?: () => void
  EventID?: number
  TagID?: number
}

export function QuestionFindModal(props: IQuestionModal) {
  const [searchResult, setSearchResult] = useState<Array<any>>([])
  const [apiCallInProgress, setapiCallInProgress] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const actions = []
  actions.push(<Button onClick={props.closeModal}>Cancel</Button>)
  actions.push(
    <Button
      onClick={() => {
        setapiCallInProgress(true)
        setErrorMessages([])
        addTagQuestions({
          Questions: selectedQuestions.map((x) => {
            return {
              EventID: props.EventID,
              TagID: props.TagID,
              PreferenceDefID: x.PreferenceDefID
            }
          })
        }).then((x) => {
          setapiCallInProgress(false)
          if (x.success && props.closeModal) {
            eventBus.publish(REFRESH_QUESTION_PAGE)
            props.closeModal()
          } else {
            setErrorMessages(x.error)
          }
        })
      }}
    >
      Submit
    </Button>
  )
  return (
    <Modal
      width="800px"
      loading={false}
      children={
        <Card title="Select Question" actions={actions}>
          <div style={{ overflowY: "scroll", padding: "10px", height: "65vh" }}>
            <OldFormError errorMessages={errorMessages}></OldFormError>
            <QuestionSearch
              onFormSubmission={(Params: any) => {
                setapiCallInProgress(true)
                setErrorMessages([])
                searchQuestions(Params).then((x) => {
                  setapiCallInProgress(false)
                  if (x.success) {
                    setSearchResult(x.data)
                    document.getElementById("scrollHereOnSearchResult")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "start"
                    })
                  } else {
                    setErrorMessages(x.error)
                  }
                })
              }}
            />
            <span id="scrollHereOnSearchResult"></span>
            <QuestionSearchResultTable
              isModal={true}
              dataSource={searchResult}
              loading={apiCallInProgress}
              setSelectedQuestions={setSelectedQuestions}
            />
          </div>
        </Card>
      }
    />
  )
}
