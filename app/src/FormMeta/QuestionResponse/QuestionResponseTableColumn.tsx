import React from "react"
import { searchQuestionResponse } from "~/ApiServices/Service/QuestionService"
import { renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { QuestionResponseAnswerUpdate } from "~/FormMeta/QuestionResponse/QuestionResponseAnswerUpdate"

export const getQuestionResponseTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Student",
      dataIndex: "SortName",
      render: (text: any, record: any) => renderLink(`/person/student/${record.StudentID}`, text, isModal)
    },
    {
      title: "Section",
      dataIndex: "Sections",
      render: (text: any, record: any) => renderLink(`/section/${record.SectionID}`, text, isModal)
    },
    {
      title: "Question",
      dataIndex: "Question",
      render: (text, record) => renderLink(`/question/${record.PreferenceDefID}`, text, isModal)
    },
    {
      title: "Answer",
      dataIndex: "AnswerText",
      render: (text: any, record: any) => <QuestionResponseAnswerUpdate questionResponse={record} />,
      width: 200,
      ellipsis: true
    },
    { title: "Previous Answer", dataIndex: "PreviousAnswers" }
  ]
  return { columns, searchFunc: searchQuestionResponse, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
