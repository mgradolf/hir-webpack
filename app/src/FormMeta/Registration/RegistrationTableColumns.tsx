import React from "react"
import { Link } from "react-router-dom"
import { findRegistrations } from "~/ApiServices/Service/RegistrationService"
import { renderBoolean, renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getRegistrationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    },
    {
      title: "Order Date",
      dataIndex: "CreateDate",
      render: renderDate
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/section/${record.SectionID}`}>{text}</Link>)
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName"
    },
    {
      title: "Purchaser",
      dataIndex: "PurchaserName"
    },
    {
      title: "Account",
      dataIndex: "AccountName"
    },
    {
      title: "Student",
      dataIndex: "StudentName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
    },
    {
      title: "Email",
      dataIndex: "EmailAddress"
    },
    {
      title: "Completion Date",
      dataIndex: "CompletionDate",
      render: renderDate
    },
    {
      title: "Grade",
      dataIndex: "GradeScaleType"
    },
    {
      title: "Certificate Issued",
      dataIndex: "CertificateIssued",
      render: renderBoolean
    },
    {
      title: "Package",
      dataIndex: "PackageName"
    },
    {
      title: "Package Start Date",
      dataIndex: "PackageStartDate",
      render: renderDate
    },
    {
      title: "Package End Date",
      dataIndex: "PackageEndDate",
      render: renderDate
    }
  ]

  const responsiveColumnIndices: number[] = [8, 9, 10, 11, 12, 13, 14]
  const expandableColumnIndices: number[] = [8, 9, 10, 11, 12, 13, 14]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findRegistrations }
}
