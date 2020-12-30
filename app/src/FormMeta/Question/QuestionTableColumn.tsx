import { searchQuestions } from "~/ApiServices/Service/QuestionService"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getQuestionTableColumn = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Question",
      dataIndex: "Name"
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
