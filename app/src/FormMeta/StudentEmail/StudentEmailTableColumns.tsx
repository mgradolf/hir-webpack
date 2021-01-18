import { renderBoolean, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { findAllStudentNotice } from "~/ApiServices/BizApi/student/studentIf"

export const getStudentEmailTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) => renderDetailsLink(`/studentemail/${record.StudentNoticeID}`)
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
    searchFunc: (Params: { [key: string]: any }) => findAllStudentNotice([Params])
  }
}
