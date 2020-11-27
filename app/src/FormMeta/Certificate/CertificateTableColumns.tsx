import React from "react"
import { Link } from "react-router-dom"
import { searchCertificate } from "~/ApiServices/Service/RegistrationService"
import { renderDate, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getCertificateTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        render: (text: any, record: any) => renderDetailsLink(`/certificate/${record.CertificateID}`)
      })
    },
    {
      title: "Certificate Number",
      dataIndex: "CertificateNumber",
      render: (text: any, record: any) => <Link to={`/certificate/${record.CertificateID}`}>{text}</Link>
    },
    {
      title: "Certificate Name",
      dataIndex: "CertificateName"
    },
    {
      title: "Valid",
      dataIndex: "PublishOnWeb",
      render: (text: any) => (text ? "Yes" : "No")
    },
    {
      title: "Issue Date",
      dataIndex: "IssueDate",
      render: renderDate
    },
    {
      title: "Expiration Date",
      dataIndex: "ExpirationDate",
      render: renderDate
    },
    {
      title: "Student ID",
      dataIndex: "StudentSerialNum",
      render: (text: any, record: any) => <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
    },
    {
      title: "Student Name",
      dataIndex: "StudentName",
      render: (text: any, record: any) => <Link to={`/person/student/${record.StudentID}`}>{text}</Link>,
    },
    {
      title: "Prefix",
      dataIndex: "Prefix"
    },
    {
      title: "Frist Name",
      dataIndex: "FirstName"
    },
    {
      title: "Last Name",
      dataIndex: "LastName"
    },
    {
      title: "Suffix",
      dataIndex: "Suffix"
    },
    {
      title: "Other Name",
      dataIndex: "OtherName"
    },
    {
      title: "Title",
      dataIndex: "Title"
    },
    {
      title: "Address",
      dataIndex: "Address"
    },
    {
      title: "Offering Title",
      dataIndex: "OfferingName"
    },
    {
      title: "Program Title",
      dataIndex: "ProgramName"
    },
    {
      title: "Issuing Department",
      dataIndex: "IssuingDepartment"
    },
    {
      title: "Issuing School",
      dataIndex: "IssuingSchool"
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber"
    },
    {
      title: "Credit Hours",
      dataIndex: "CreditHours"
    },
    {
      title: "Clock Hours",
      dataIndex: "ClockHours"
    },
    {
      title: "CEU Hours",
      dataIndex: "CEUHours"
    },
    {
      title: "Load Hours",
      dataIndex: "LoadHours"
    },
    {
      title: "Instructors",
      dataIndex: "Instructors"
    },
    {
      title: "Alpha Value",
      dataIndex: "AlphaValue"
    },
    {
      title: "GAP Value",
      dataIndex: "GPAValue"
    },
    {
      title: "Completion Date",
      dataIndex: "CompletionDate",
      render: renderDate
    }
  ]
  const responsiveColumnIndices: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
  const expandableColumnIndices: number[] = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchCertificate }
}
