import React from "react"
import { Link } from "react-router-dom"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"
import { renderDate, renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getPersonTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      render: (text: any, record: any) =>
        !isModal ? (
          <Link to={`/person/${record.PersonID}`}>{`${record.FirstName} ${record.LastName}`}</Link>
        ) : (
          <span>{`${record.FirstName} ${record.LastName}`}</span>
        )
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "BirthDate ", dataIndex: "Birthday", render: renderDate },
    { title: "City", dataIndex: "Locality" },
    { title: "ERP ID", dataIndex: "ERPID" }
    // { title: "Last Name", dataIndex: "LastName" },
    // { title: "First Name", dataIndex: "FirstName" },
    // { title: "Middle Name", dataIndex: "MiddleName" },
    // { title: "SSN", dataIndex: "GovID" },
    // { title: "Gender", dataIndex: "GenderTypeName" },
    // { title: "Ethnicity", dataIndex: "EthnicityTypeName" },
    // { title: "Address", dataIndex: "Address" },
    // { title: "Deceased", dataIndex: "IsDeceased", render: renderBoolean },
    // { title: "Address Line1", dataIndex: "AddressLine1" },
    // { title: "Address Line2", dataIndex: "AddressLine2" },
    // { title: "Address Line 3", dataIndex: "AddressLine3" },
    // { title: "State", dataIndex: "State" },
    // { title: "Country", dataIndex: "Country" },
    // { title: "Postal Code", dataIndex: "PostalCode" },
    // { title: "Maiden Name", dataIndex: "MaidenName" },
    // { title: "Other Name", dataIndex: "OtherName" },
    // { title: "Person ID", dataIndex: "PersonID" },
    // { title: "Account ", dataIndex: "AccountName" },
    // { title: "Role", dataIndex: "RoleName" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchPersons }
}
