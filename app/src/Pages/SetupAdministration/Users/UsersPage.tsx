import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getUserTableColumns } from "~/FormMeta/User/UserTableColumns"

export const UsersPage = () => {
  return <SearchPage title="Users" tableProps={getUserTableColumns()} defaultFilter={{}} />
}
