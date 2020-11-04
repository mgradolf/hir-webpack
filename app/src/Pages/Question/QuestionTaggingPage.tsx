import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getTagQuestions, updateTagQuestion } from "~/ApiServices/Service/QuestionService"
import { getQuestionGroup } from "~/ApiServices/Service/RefLookupService"
import QuestionSearchByEventTag from "~/Component/Question/QuestionSearchByEventTag"
import QuestionCreateButton from "~/Component/Question/Create/QuestionCreateButton"
import QuestionTable from "~/Component/Question/QuestionTable"
import QuestionFindButton from "~/Component/Question/Search/QuestionFindButton"
import { eventBus, REFRESH_QUESTION_PAGE } from "~/utils/EventBus"
import { Form } from "antd"

export default function QuestionPage(props: RouteComponentProps<{ offeringID?: string; sectionID?: string }>) {
  const sectionID = Number(props.match.params.sectionID)
  const [allQuestions, setAllQuestions] = useState<Array<any>>([])
  const [allQuestionGroup, setAllQuestionGroup] = useState([])
  const [filters, setFilters] = useState<{ [key: string]: any }>()
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
      if (filters) {
        getTagQuestions(filters)
          .then((x) => {
            if (x.success) setAllQuestions(x.data)
          })
          .finally(() => {
            setApiCallInProgress(false)
          })
      }
    }
    eventBus.subscribe(REFRESH_QUESTION_PAGE, loadQuestions)
    eventBus.publish(REFRESH_QUESTION_PAGE)
    return () => eventBus.unsubscribe(REFRESH_QUESTION_PAGE)
  }, [filters])

  return (
    <>
      <Form
        hideRequiredMark
        layout="horizontal"
        style={{ background: "#fff", borderRadius: "4px", marginBottom: "1rem", padding: "1rem" }}
      >
        <QuestionSearchByEventTag
          setFilters={(Params: any) => {
            setFilters(Params)
          }}
        />
        <div style={{ zIndex: 10, textAlignLast: "end" }}>
          <QuestionCreateButton SectionID={sectionID} {...filters} />
          <QuestionFindButton SectionID={sectionID} {...filters} />
        </div>
      </Form>
      <QuestionTable
        loading={apiCallInProgress}
        allQuestions={allQuestions}
        allQuestionGroup={allQuestionGroup}
        updateQuestion={(Params: { [key: string]: any }) => {
          updateTagQuestion(Params).then((x) => {
            if (x.success) {
            }
          })
        }}
      />
    </>
  )
}
