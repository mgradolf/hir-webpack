import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"
import { renderBoolean, renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getAccountAffiliationTableColumn = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Last Name", dataIndex: "LastName" },
    { title: "First Name", dataIndex: "FirstName" },
    { title: "Email", dataIndex: "EmailAddress" },
    { title: "Birth Date", dataIndex: "Birthday", render: renderDate },
    { title: "Role ", dataIndex: "AffiliationRoleTypeName" },
    { title: "Shared", dataIndex: "IsContactShared", render: renderBoolean },
    { title: "Status", dataIndex: "AccountAffiliationStatusName" },
    { title: "Primary Contact", dataIndex: "PrimaryAccountAffiliation", render: renderBoolean }
  ]
  return { columns, searchFunc: getAccountAffiliation, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
