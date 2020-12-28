import React from "react"
import { Link } from "react-router-dom"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"

import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getInstructorTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    // {
    //   title: "ID",
    //   dataIndex: "FacultySerialNum",
    //   render: (text: any, record: any) => (
    //     <Link to={`/person/faculty/${record.FacultyID}`}>{record.FacultySerialNum}</Link>
    //   ),
    //   sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    // },
    {
      title: "Name",
      dataIndex: "FacultySerialNum",
      render: (text: any, record: any) => (
        <Link to={`/person/faculty/${record.FacultyID}`}>{record.FirstName + " " + record.LastName}</Link>
      ),
      sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "Organization", dataIndex: "OrganizationName" },
    { title: "Status", dataIndex: "Status" },
    { title: "Instructor Type", dataIndex: "InstructorType" }
    // { title: "Last Name", dataIndex: "LastName" },
    // { title: "First Name", dataIndex: "FirstName" },
    // { title: "SSN", dataIndex: "SSN" },
    // { title: "ERP ID", dataIndex: "ERPID" },
    // { title: "Birthday", render: renderDate, dataIndex: "Birthday" },
    // { title: "Gender", dataIndex: "GenderTypeName" },
    // { title: "Ethnicity", dataIndex: "EthnicityTypeName" },
    // { title: "Address", dataIndex: "Address" },
    // { title: "Deceased", render: renderBoolean, dataIndex: "IsDeceased" },
    // { title: "Address Line1", dataIndex: "AddressLine1" },
    // { title: "Address Line2", dataIndex: "AddressLine2" },
    // { title: "Address Line 3", dataIndex: "AddressLine3" },
    // { title: "City", dataIndex: "Locality" },
    // { title: "State", dataIndex: "State" },
    // { title: "Country", dataIndex: "Country" },
    // { title: "Postal Code", dataIndex: "PostalCode" },
    // { title: "Maiden Name", dataIndex: "MaidenName" },
    // { title: "Other Name", dataIndex: "OtherName" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchFaculties }
}
