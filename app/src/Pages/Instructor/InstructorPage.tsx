import React from "react"
import InstructorSearchFiltersMeta from "~/FormMeta/Offering/QualifiedInstructorSearchFilterMeta"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { Link } from "react-router-dom"

export default function InstructorPage() {
  const columns = [
    {
      title: "ID",
      dataIndex: "FacultySerialNum",
      key: "FacultySerialNum",
      render: (text: any, record: any) => <Link to={`/instructor/${record.FacultyID}`}>{record.FacultySerialNum}</Link>,
      sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName"
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName"
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status"
    },
    {
      title: "Birthday",
      dataIndex: "Birthday",
      render: renderDate,
      key: "Birthday"
    },
    {
      title: "Gender",
      dataIndex: "GenderTypeName",
      key: "GenderTypeNamer"
    },
    {
      title: "Email",
      dataIndex: "EmailAddress",
      key: "EmailAddress"
    }
  ]
  return (
    <SearchPage
      title="Manage Insttructors"
      meta={InstructorSearchFiltersMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: searchFaculties,
        rowKey: "PersonID",
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
