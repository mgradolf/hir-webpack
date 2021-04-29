import { getOfferingApprovalHist } from "~/ApiServices/Service/OfferingService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOfferingApprovalTableColumns = (OfferingID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Status",
      dataIndex: "StateName"
    },
    {
      title: "Modified By",
      dataIndex: "ModifiedBy"
    },
    {
      title: "Modified Date",
      dataIndex: "ModifiedDate",
      render: renderDate
    },
    {
      title: "Remarks",
      dataIndex: "Remarks"
    },
    {
      title: "Send To",
      dataIndex: "RouteTo"
    }
  ]

  return {
    columns,
    searchFunc: () => getOfferingApprovalHist({ OfferingID }),
    tableName: "ApprovalTableColumns"
  }
}
