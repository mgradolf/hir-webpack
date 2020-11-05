import React from "react"
import { findRegistrations } from "~/ApiServices/Service/RegistrationService"
import { renderDate, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
interface IOrderReturnItems {
  OrderID: number
}
export default function OrderReturnItems({ OrderID }: IOrderReturnItems) {
  return (
    <ResponsiveTable
      columns={[
        { title: "StudentID", dataIndex: "StudentSerialNumber" },
        { title: "StudentName", dataIndex: "StudentName" },
        { title: "SectionNumber", dataIndex: "SectionNumber" },
        { title: "OfferingName", dataIndex: "OfferingName" },
        {
          title: "Registration Date",
          dataIndex: "DateReturned",
          render: renderDate
        }
      ]}
      searchFunc={findRegistrations}
      searchParams={{ OrderID }}
      pagination={false}
    />
  )
}
