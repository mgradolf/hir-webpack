import React from "react"
import { Link } from "react-router-dom"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchStudents } from "~/ApiServices/BizApi/student/studentIf"

export const getStudentTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      render: (text: any, record: any) =>
        !isModal ? (
          <Link to={`/person/student/${record.StudentID}`}>{`${record.FirstName} ${record.LastName}`}</Link>
        ) : (
          <span>{`${record.FirstName} ${record.LastName}`}</span>
        )
    },
    { title: "Email", dataIndex: "EmailAddress" },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "BirthDate ", dataIndex: "Birthday", render: renderDate },
    { title: "City", dataIndex: "Locality" },
    { title: "ERP ID", dataIndex: "ERPID" }
    // { title: "Last Name", dataIndex: "LastName" },
    // { title: "First Name", dataIndex: "FirstName" },
    // { title: "Middle Name", dataIndex: "MiddleName" },
    // { title: "SSN", dataIndex: "SSN" },
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
    // { title: "Student ID", dataIndex: "StudentID" },
    // { title: "Account ", dataIndex: "AccountName" },
    // { title: "Role", dataIndex: "RoleName" }
  ]

  const responsiveColumnIndices = [4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  const expandableColumnIndices = [7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchStudents }
}
