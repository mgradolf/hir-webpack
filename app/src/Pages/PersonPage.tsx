import { ColumnsType } from "antd/lib/table"
import React from "react"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import SearchPage from "~/Component/Common/Page/SearchPage"

export default function PersonTable() {
  const columns: ColumnsType<RecordType> = [
    { title: "First Name", dataIndex: "FirstName", width: 150 },
    { title: "Last Name", dataIndex: "LastName", width: 150 },
    { title: "Middle Name", dataIndex: "MiddleName", width: 150 },
    { title: "Other Name", dataIndex: "OtherName", width: 150 },
    { title: "Address", dataIndex: "Address", width: 150 },
    { title: "City", dataIndex: "City", width: 150 },
    { title: "Postal Code", dataIndex: "PostalCode", width: 150 },
    { title: "Email Address", dataIndex: "EmailAddress", width: 150 },
    { title: "Telephone Number", dataIndex: "TelephoneNumber", width: 150 },
    { title: "Account Name", dataIndex: "AccountName", width: 150 },
    { title: "Role Name", dataIndex: "RoleName", width: 150 },
    { title: "Name", dataIndex: "Name", width: 150 }
  ]
  return (
    <SearchPage
      title="Manage Persons"
      meta={PersonSearchFilterMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: searchPersons,
        rowKey: "PersonID",
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
