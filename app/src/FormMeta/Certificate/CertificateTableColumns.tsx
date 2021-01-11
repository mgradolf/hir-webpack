import React from "react"
import { Link } from "react-router-dom"
import { searchCertificate } from "~/ApiServices/Service/RegistrationService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getCertificateTableColumns = (isCourse: boolean): ITableConfigProp => {
  const route = isCourse ? "course" : "program"
  const columns: TableColumnType = [
    {
      title: "Certificate Number",
      dataIndex: "CertificateNumber",
      render: (text: any, record: any) => (
        <Link to={`/${route}/certificate/${record.StudentCertificateID}`}>{text}</Link>
      )
    },
    {
      title: "Student Name",
      dataIndex: "StudentName",
      render: (text: any, record: any) => <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
    },
    {
      title: "Issue Date",
      dataIndex: "IssueDate",
      render: renderDate
    },
    {
      title: "Certificate Name",
      dataIndex: "CertificateName"
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName"
    }

    // {
    //   title: "Valid",
    //   dataIndex: "PublishOnWeb",
    //   render: (text: any) => (text ? "Yes" : "No")
    // },
    // {
    //   title: "Expiration Date",
    //   dataIndex: "ExpirationDate",
    //   render: renderDate
    // },
    // {
    //   title: "Student ID",
    //   dataIndex: "StudentSerialNum",
    //   render: (text: any, record: any) => <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
    // },
    // {
    //   title: "Prefix",
    //   dataIndex: "Prefix"
    // },
    // {
    //   title: "Frist Name",
    //   dataIndex: "FirstName"
    // },
    // {
    //   title: "Last Name",
    //   dataIndex: "LastName"
    // },
    // {
    //   title: "Suffix",
    //   dataIndex: "Suffix"
    // },
    // {
    //   title: "Other Name",
    //   dataIndex: "OtherName"
    // },
    // {
    //   title: "Title",
    //   dataIndex: "Title"
    // },
    // {
    //   title: "Address",
    //   dataIndex: "Address"
    // },
    // {
    //   title: "Program Title",
    //   dataIndex: "ProgramName"
    // },
    // {
    //   title: "Issuing Department",
    //   dataIndex: "IssuingDepartment"
    // },
    // {
    //   title: "Issuing School",
    //   dataIndex: "IssuingSchool"
    // },
    // {
    //   title: "Section Number",
    //   dataIndex: "SectionNumber"
    // },
    // {
    //   title: "Credit Hours",
    //   dataIndex: "CreditHours"
    // },
    // {
    //   title: "Clock Hours",
    //   dataIndex: "ClockHours"
    // },
    // {
    //   title: "CEU Hours",
    //   dataIndex: "CEUHours"
    // },
    // {
    //   title: "Load Hours",
    //   dataIndex: "LoadHours"
    // },
    // {
    //   title: "Instructors",
    //   dataIndex: "Instructors"
    // },
    // {
    //   title: "Alpha Value",
    //   dataIndex: "AlphaValue"
    // },
    // {
    //   title: "GAP Value",
    //   dataIndex: "GPAValue"
    // },
    // {
    //   title: "Completion Date",
    //   dataIndex: "CompletionDate",
    //   render: renderDate
    // }
  ]
  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchCertificate }
}
