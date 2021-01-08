import React from "react"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { getUserTableColumns } from "~/FormMeta/User/UserTableColumns"

export const UsersPage = () => {
  return <ResponsiveTable {...getUserTableColumns()} searchParams={{}} />
}
