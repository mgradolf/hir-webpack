import React from "react"
import { Link } from "react-router-dom"
import { searchQuestions } from "~/ApiServices/Service/QuestionService"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getQuestionRepositoryTableColumn = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Question",
      dataIndex: "Name",
      render: (text, record) => (isModal ? text : <Link to={`/question/${record.PreferenceDefID}`}>{text}</Link>)
    },
    {
      title: "Display Question As",
      dataIndex: "Description"
    },
    { title: "Type", dataIndex: "PreferenceValueTypeName" },
    { title: "Active", dataIndex: "IsActive", render: renderBoolean },
    { title: "Organization", dataIndex: "OrganizationName" }
  ]
  return { columns, searchFunc: searchQuestions, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
