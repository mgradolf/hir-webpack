import { getTaggedQuestionsByAffiliationRoleType } from "~/ApiServices/BizApi/account/accountIF"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getAccountQuestionTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Group",
      dataIndex: "QuestionGroupName"
    },
    {
      title: "Sort Order",
      dataIndex: "SortPosition"
    },
    {
      title: "Question",
      dataIndex: "Name"
    },
    {
      title: "Required",
      dataIndex: "IsRequired",
      render: renderBoolean
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    },
    {
      title: "Tag",
      dataIndex: "TagName"
    }
  ]
  return {
    columns,
    searchFunc: getTaggedQuestionsByAffiliationRoleType,
    tableName: "AccountQuestionTableColumns"
  }
}
