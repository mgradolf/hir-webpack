import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getTagQuestions, updateTagQuestion } from "~/ApiServices/Service/QuestionService"
import { getQuestionGroup } from "~/ApiServices/Service/RefLookupService"
import QuestionSearchCustomFIlter from "~/Component/Question/QuestionSearchCustomFIlter"
import QuestionTable from "~/Component/Question/QuestionTable"
import { eventBus, REFRESH_QUESTION_PAGE } from "~/utils/EventBus"

export default function QuestionPage(props: RouteComponentProps<{ offeringID?: string; sectionID?: string }>) {
  const sectionID = Number(props.match.params.sectionID)
  const [allQuestions, setAllQuestions] = useState<Array<any>>([])
  const [allQuestionGroup, setAllQuestionGroup] = useState([])
  const [filters, setFilters] = useState({})
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  useEffect(() => {
    getQuestionGroup().then((x) => {
      if (x.success) {
        setAllQuestionGroup(x.data)
      }
    })
  }, [])
  useEffect(() => {
    const loadQuestions = () => {
      setApiCallInProgress(true)
      getTagQuestions(filters)
        .then((x) => {
          if (x.success) setAllQuestions(x.data)
        })
        .finally(() => {
          setApiCallInProgress(false)
        })
    }
    eventBus.subscribe(REFRESH_QUESTION_PAGE, loadQuestions)
    eventBus.publish(REFRESH_QUESTION_PAGE)
    return () => eventBus.unsubscribe(REFRESH_QUESTION_PAGE)
  }, [filters])

  return (
    <div>
      <QuestionSearchCustomFIlter entityID={sectionID} entityType="Section" setFilters={setFilters} />
      <QuestionTable
        loading={apiCallInProgress}
        allQuestions={allQuestions}
        allQuestionGroup={allQuestionGroup}
        updateQuestion={(Params: { [key: string]: any }) => {
          updateTagQuestion(Params).then((x) => {
            if (x.success) {
              // eventBus.publish(REFRESH_QUESTION_PAGE)
            }
          })
        }}
      />
    </div>
  )
}
