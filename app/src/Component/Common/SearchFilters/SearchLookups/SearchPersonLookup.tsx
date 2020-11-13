import * as React from "react"
import AccountSearchFilterMeta from "~/FormMeta/Account/AccountSearchFilterMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { Link } from "react-router-dom"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"

export function SearchPersonLookupButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
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
    <SearchLookupOpenButton
      searchFunc={searchPersons}
      valueField="PersonID"
      displayField="Name"
      columns={columns}
      meta={AccountSearchFilterMeta}
      {...props}
    />
  )
}
