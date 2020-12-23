import React from "react"
import { Link } from "react-router-dom"
import { findRegistrationsWebadmin } from "~/ApiServices/Service/RegistrationService"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getRegistrationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        title: "",
        dataIndex: "",
        render: (text: any, record: any) => (
          <Link to={`/section/${record.SectionID}/registration/${record.StudentID}`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/section/${record.SectionID}`}>{text}</Link>)
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Student",
      dataIndex: "StudentName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/person/student/${record.StudentID}`}>{text}</Link>
    },
    {
      title: "Email",
      dataIndex: "EmailAddress",
      render: renderEmail
    },
    {
      title: "Registration Status",
      dataIndex: "EnrollmentStatus",
      render: undefined
    },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/account/${record.AccountID}`}>{text}</Link>)
    }

    // {
    //   title: "Order Date",
    //   dataIndex: "CreateDate",
    //   render: renderDate
    // },
    // {
    //   title: "Purchaser",
    //   dataIndex: "PurchaserName"
    // },
    // {
    //   title: "Completion Date",
    //   dataIndex: "CompletionDate",
    //   render: renderDate
    // },
    // {
    //   title: "Grade",
    //   dataIndex: "GradeScaleType"
    // },
    // {
    //   title: "Certificate Issued",
    //   dataIndex: "CertificateIssued",
    //   render: renderBoolean
    // },
    // {
    //   title: "Package",
    //   dataIndex: "PackageName"
    // },
    // {
    //   title: "Package Start Date",
    //   dataIndex: "PackageStartDate",
    //   render: renderDate
    // },
    // {
    //   title: "Package End Date",
    //   dataIndex: "PackageEndDate",
    //   render: renderDate
    // }
  ]

  return { columns, searchFunc: findRegistrationsWebadmin }
}
