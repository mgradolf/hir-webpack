import { renderBoolean, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { findAllStudentNotice } from "~/ApiServices/BizApi/student/studentIf"

export const getStudentEmailTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      dataIndex: "StudentNoticeID",
      render: (text: any, record: any) => renderDetailsLink(`/student-email-notification/${text}`)
    },
    {
      title: "Notification Name",
      dataIndex: "StudentNoticeName"
    },
    {
      title: "Description",
      dataIndex: "StudentNoticeDesc"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    },
    {
      title: "From User ID",
      dataIndex: "FromUserID"
    },
    {
      title: "From Email Address",
      dataIndex: "FromEmailAddress"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return {
    columns,
    responsiveColumnIndices,
    expandableColumnIndices,
    searchFunc: findAllStudentNotice
  }
}
