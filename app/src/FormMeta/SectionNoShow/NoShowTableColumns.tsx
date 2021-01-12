import { renderDate, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchNoShowProcessings } from "~/ApiServices/Service/RegistrationService"

export const getSectionNoShowTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Student Name",
      dataIndex: "StudentFirstName",
      render: (text, record) => renderLink(`/person/student/${record.StudentID}`, text)
    },
    // { title: "Last Name", dataIndex: "StudentLastName" },
    { title: "Order ID", dataIndex: "OrderID" },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      render: renderDate
    },
    // {
    //   title: "Section Number",
    //   dataIndex: "SectionNumber",
    //   render: (text, record) => renderLink(`/section/${record.SectionID}`, text)
    // },
    { title: "Quantity", dataIndex: "Quantity" },
    { title: "Total Amount", dataIndex: "TotalAmount" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchNoShowProcessings }
}
