import { renderDate, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchNoShowProcessings } from "~/ApiServices/Service/RegistrationService"

export const getSectionNoShowTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Student",
      dataIndex: "StudentFirstName",
      render: (text, record) => renderLink(`/person/student/${record.StudentID}`, text)
    },

    { title: "Order ID", dataIndex: "OrderID" },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      render: renderDate
    },

    { title: "Quantity", dataIndex: "Quantity" },
    { title: "Total Amount", dataIndex: "TotalAmount" }
  ]
  return { columns, searchFunc: searchNoShowProcessings, tableName: "NoShowTableColumns" }
}
