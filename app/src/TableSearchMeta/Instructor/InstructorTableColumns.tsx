import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"

import { renderEmail, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getInstructorTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "FacultySerialNum",
      render: (text: any, record: any) => renderLink(`/person/faculty/${record.FacultyID}`, record.SortName, isModal),
      sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "Organization", dataIndex: "OrganizationName" },
    { title: "Status", dataIndex: "Status" },
    { title: "Instructor Type", dataIndex: "InstructorType" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return {
    columns,
    responsiveColumnIndices,
    expandableColumnIndices,
    searchFunc: searchFaculties,
    tableName: "InstructorTableColumns"
  }
}
