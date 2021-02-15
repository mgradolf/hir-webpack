import React from "react"
import { findSectionFacultyComments } from "~/ApiServices/Service/CommentService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import CommentRemoveLink from "~/Component/Comment/CommentRemoveLink"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getInstructorCommentTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Date/Time",
      dataIndex: "CreationDate",
      render: renderDate
    },
    {
      title: "Category",
      dataIndex: "CategoryName"
    },
    {
      title: "Comment",
      dataIndex: "CommentText"
    },
    {
      title: "Entered By",
      dataIndex: "UserName"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <CommentRemoveLink SectionFacultyCommentID={record.SectionFacultyCommentID} />
    }
  ]

  return { columns, searchFunc: findSectionFacultyComments }
}
