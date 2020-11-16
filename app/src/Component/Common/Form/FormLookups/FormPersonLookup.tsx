import * as React from "react"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import { FormLookupOpenButton } from "~/Component/Common/Form/FormLookupOpenButton"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { Link } from "react-router-dom"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"
import { FormInstance } from "antd/lib/form"

export function SearchPersonLookupButton(props: { formInstance: FormInstance; onCloseModal?: (person: any) => void }) {
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
    <FormLookupOpenButton
      lookupModalTitle="Select Person"
      searchFunc={searchPersons}
      valueField="PersonID"
      displayField="SortName"
      fieldName="PersonID"
      label="Person"
      formInstance={props.formInstance}
      columns={columns}
      meta={PersonSearchFilterMeta}
      onCloseModal={props.onCloseModal}
    />
  )
}
