import React from "react"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { Link } from "react-router-dom"

export default function PersonTable() {
  const columns: TableColumnType = [
    {
      title: "Name",
      width: 150,
      render: (text: any, record: any) => (
        <Link to={`/person/${record.PersonID}`}>{`${record.FirstName} ${record.LastName}`}</Link>
      )
    },
    { title: "Role Name", dataIndex: "RoleName", width: 150 },
    { title: "Address", dataIndex: "Address", width: 150 },
    { title: "City", dataIndex: "City", width: 150 },
    { title: "Postal Code", dataIndex: "PostalCode", width: 150 },
    { title: "Email Address", dataIndex: "EmailAddress", width: 150 },
    { title: "Telephone Number", dataIndex: "TelephoneNumber", width: 150 },
    { title: "Account Name", dataIndex: "AccountName", width: 150 }
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
      helpKey="https://docs.google.com/document/d/1FKV-i5gsVClhsHLYFMqpdEGDVZmwJU576AXKKcTfwiY/edit?usp=sharing"
    ></SearchPage>
  )
}
