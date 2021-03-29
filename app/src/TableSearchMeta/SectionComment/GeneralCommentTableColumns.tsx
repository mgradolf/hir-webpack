import React from "react"
import { findSectionComments } from "~/ApiServices/Service/CommentService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { CommentRemoveLink } from "~/Component/Comment/CommentRemoveLink"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getGeneralCommentTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Date/Time",
      dataIndex: "CreationDate",
      render: renderDate
    },
    {
      title: "Category",
      dataIndex: "CommentCategory"
    },
    {
      title: "Comment",
      dataIndex: "CommentText"
    },
    {
      title: "Entered By",
      dataIndex: "FormattedName"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <CommentRemoveLink SectionCommentID={record.SectionCommentID} />
    }
  ]

  return { columns, searchFunc: findSectionComments, tableName: "GeneralCommentTableColumns" }
}
