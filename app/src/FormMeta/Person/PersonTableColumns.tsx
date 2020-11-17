import React from "react"
import { Link } from "react-router-dom"
import { renderBoolean, renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"

export const getPersonTableColumns = (isModal = false): TableColumnType => {
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
    { title: "Last Name", dataIndex: "LastName" },
    { title: "First Name", dataIndex: "FirstName" },
    { title: "Middle Name", dataIndex: "MiddleName" },
    { title: "SSN", dataIndex: "SSN" },
    { title: "ERP ID", dataIndex: "ERPID" },
    { title: "BirthDate ", dataIndex: "Birthday", render: renderDate },
    { title: "Gender", dataIndex: "GenderTypeName" },
    { title: "Ethnicity", dataIndex: "EthnicityTypeName" },
    { title: "Address", dataIndex: "Address" },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "Email", dataIndex: "EmailAddress" },
    { title: "Deceased", dataIndex: "IsDeceased", render: renderBoolean },
    { title: "Address Line1", dataIndex: "AddressLine1" },
    { title: "Address Line2", dataIndex: "AddressLine2" },
    { title: "Address Line 3", dataIndex: "AddressLine3" },
    { title: "City", dataIndex: "Locality" },
    { title: "State", dataIndex: "State" },
    { title: "Country", dataIndex: "Country" },
    { title: "Postal Code", dataIndex: "PostalCode" },
    { title: "Maiden Name", dataIndex: "MaidenName" },
    { title: "Other Name", dataIndex: "OtherName" },
    { title: "Person ID", dataIndex: "PersonID" },
    { title: "Account ", dataIndex: "AccountName" },
    { title: "Role", dataIndex: "RoleName" }
  ]

  return columns
}

export const personResponsiveIndices = [17, 18, 19, 20, 21, 22, 23, 24, 25]
export const personExpandableIndices = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
