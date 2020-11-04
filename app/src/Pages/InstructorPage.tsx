import React, { useState } from "react"
import InstructorSearchFiltersMeta from "~/FormMeta/Offering/QualifiedInstructorSearchFilterMeta"
import InstructorSearchFilters from "~/Component/Common/SearchFilters"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"
import moment from "moment"

export default function InstructorPage() {
  const [searchParamm, setSearchParamm] = useState<{ [key: string]: any }>({})
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
    <div className="site-layout-content">
      <InstructorSearchFilters
        initialFilter={searchParamm}
        visible
        isCheckeble={false}
        isModalView={true}
        meta={InstructorSearchFiltersMeta}
        title="Instructor Filter"
        toggleVisiibility={() => {
          console.log("p")
        }}
        onApplyChanges={(newFilterValues, newFilterCount) => {
          setSearchParamm(newFilterValues)
        }}
      />

      <ResponsiveTable rowKey="AccountID" columns={columns} searchFunc={searchFaculties} searchParams={searchParamm} />
    </div>
  )
}
