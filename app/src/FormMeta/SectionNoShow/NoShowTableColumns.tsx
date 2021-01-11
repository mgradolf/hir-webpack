import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchNoShowProcessings } from "~/ApiServices/Service/RegistrationService"

export const getSectionNoShowTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Student First Name", dataIndex: "StudentFirstName" },
    { title: "Last Name", dataIndex: "StudentLastName" },
    { title: "Order ID", dataIndex: "OrderID" },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      render: renderDate
    },
    { title: "Section Number", dataIndex: "SectionNumber" },
    { title: "Quantity", dataIndex: "Quantity" },
    { title: "Total Amount", dataIndex: "TotalAmount" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchNoShowProcessings }
}
