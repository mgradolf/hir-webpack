import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getTagQuestions } from "~/ApiServices/Service/QuestionService"
import QuestionSearchCustomFIlter from "~/Component/Question/QuestionSearchCustomFIlter"
import QuestionTable from "~/Component/Question/QuestionTable"

export default function QuestionPage(props: RouteComponentProps<{ offeringID?: string; sectionID?: string }>) {
  const sectionID = Number(props.match.params.sectionID)
  const [allQuestions, setAllQuestions] = useState<Array<any>>([])
  const [filters, setFilters] = useState({})

  useEffect(() => {
    getTagQuestions(filters).then((x) => {
      if (x.success) setAllQuestions(x.data)
    })
  }, [filters])

  return (
    <div>
      <QuestionSearchCustomFIlter entityID={sectionID} entityType="Section" setFilters={setFilters} />
      <QuestionTable allQuestions={allQuestions} />
    </div>
  )
}
