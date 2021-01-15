import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { UserCreateButton } from "~/FormMeta/User/UserFormMeta"
import { getUserTableColumns } from "~/FormMeta/User/UserTableColumns"

export const UsersPage = () => {
  return (
    <SearchPage title="Users" blocks={[<UserCreateButton />]} tableProps={getUserTableColumns()} defaultFilter={{}} />
    // <SearchPage title="Users" tableProps={getUserTableColumns()} defaultFilter={{}} />
  )
}
