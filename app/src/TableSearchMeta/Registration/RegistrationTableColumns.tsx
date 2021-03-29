import React from "react"
import { Link } from "react-router-dom"
import { findRegistrationsWebAdmin } from "~/ApiServices/Service/RegistrationService"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getRegistrationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        dataIndex: "StudentID",
        render: (text: any, record: any) => (
          <Link to={`/section/${record.SectionID}/registration/${text}`}>
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
  ]

  return { columns, searchFunc: findRegistrationsWebAdmin, tableName: "RegistrationTableColumns" }
}
