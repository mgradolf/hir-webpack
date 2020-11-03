import React from "react"
import InstructorSearchFiltersMeta from "~/FormMeta/Offering/QualifiedInstructorSearchFilterMeta"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"
import moment from "moment"
import SearchPage from "~/Component/Common/Page/SearchPage"

export default function InstructorPage() {
  const columns = [
    {
      title: "ID",
      dataIndex: "FacultySerialNum",
      key: "FacultySerialNum",
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
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : ""),
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
