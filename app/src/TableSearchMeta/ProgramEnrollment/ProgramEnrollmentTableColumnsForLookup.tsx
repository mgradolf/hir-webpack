import { renderDate, renderEmail, sortByString, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { searchEnrollment } from "~/ApiServices/BizApi/program/programEnrollmentIF"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getProgramEnrollmentTableColumnsForLookup = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Program Code",
      dataIndex: "ProgramCode",
      sorter: (a: any, b: any) => sortByString(a?.ProgramCode, b?.ProgramCode)
    },
    { title: "Program Name", dataIndex: "ProgramName" },
    { title: "Department", dataIndex: "DepartmentName" },
    {
      title: "Student Name",
      dataIndex: "StudentName"
    },
    { title: "Enrollment Date ", dataIndex: "EnrollmentDate", render: renderDate },
    { title: "Email", dataIndex: "Email", render: renderEmail },
    { title: "Status", dataIndex: "StatusName" },
    {
      title: "Order ID",
      dataIndex: "OrderID"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchEnrollment }
}
