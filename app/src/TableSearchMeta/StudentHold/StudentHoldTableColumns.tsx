import React from "react"
import { Button, Dropdown } from "antd"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { DownOutlined } from "@ant-design/icons"
import { findStudentHold } from "~/ApiServices/BizApi/student/studentHoldIF"
import { StudentHoldMenu } from "~/Component/Student/StudentHoldMenu"

export const getStudentHoldTableColumns = (StudentID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Hold Date", dataIndex: "EndDate", render: renderDate },
    { title: "Hold Type", dataIndex: "HoldName" },
    { title: "Hold Reason", dataIndex: "HoldReason" },
    { title: "Hold By", dataIndex: "HoldBy" },
    { title: "Release Date", dataIndex: "ReleaseDate", render: renderDate },
    { title: "Release Reason", dataIndex: "ReleaseReason" },
    { title: "Release By", dataIndex: "ReleasedBy" },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Dropdown overlay={<StudentHoldMenu initialData={record} studentID={StudentID} />} trigger={["click"]}>
          <Button type="primary" onClick={(e) => e.preventDefault()}>
            Go To <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findStudentHold }
}
