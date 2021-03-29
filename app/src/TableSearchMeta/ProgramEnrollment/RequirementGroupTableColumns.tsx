import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigPropWithDataSource } from "~/TableSearchMeta/ITableConfigProp"

export const getRequirementGroupTableColumns = (programEnrollment: any): ITableConfigPropWithDataSource => {
  const columns: TableColumnType = [
    {
      title: "Requirement Group",
      dataIndex: "Name"
    },
    {
      title: "Requirement Policy",
      dataIndex: "PolicyName"
    },
    { title: "Expected", dataIndex: "ExpectedValue" },
    { title: "Actual", dataIndex: "ActualValue" }
  ]

  return { columns, dataSource: programEnrollment.Summary, tableName: "RequirementGroupTableColumns" }
}
