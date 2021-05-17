import React from "react"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { findStudentHold } from "~/ApiServices/BizApi/student/studentHoldIF"
import { StudentHoldMenu } from "~/Component/Feature/Student/StudentHoldMenu"

export const getStudentHoldTableColumns = (StudentID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Hold Date", dataIndex: "StartDate", render: renderDate },
    { title: "Hold Type", dataIndex: "HoldName" },
    { title: "Hold Reason", dataIndex: "HoldReason" },
    { title: "Hold By", dataIndex: "HoldBy" },
    { title: "Release Date", dataIndex: "ReleaseDate", render: renderDate },
    { title: "Release Reason", dataIndex: "ReleaseReason" },
    { title: "Release By", dataIndex: "ReleasedBy" },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <StudentHoldMenu initialData={record} studentID={StudentID} />
    }
  ]

  return { columns, searchFunc: findStudentHold, tableName: "StudentHoldTableColumns" }
}
