import moment from "moment"
import React from "react"
import { findRegistrations } from "~/ApiServices/Service/RegistrationService"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { DATE_FORMAT } from "~/utils/Constants"
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
          render: (text: any) => (text !== null ? moment(text).format(DATE_FORMAT) : "")
        }
      ]}
      searchFunc={findRegistrations}
      searchParams={{ OrderID }}
      pagination={false}
    />
  )
}
