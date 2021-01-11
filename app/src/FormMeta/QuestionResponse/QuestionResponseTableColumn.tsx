import React from "react"
import { Link } from "react-router-dom"
import { searchQuestionResponse } from "~/ApiServices/Service/QuestionService"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { QuestionResponseAnswerUpdate } from "~/FormMeta/QuestionResponse/QuestionResponseAnswerUpdate"

export const getQuestionResponseTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Student ID",
      dataIndex: "StudentSerialNum",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
    },
    {
      title: "Student",
      dataIndex: "SortName",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
    },
    { title: "Question", dataIndex: "Question" },
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
