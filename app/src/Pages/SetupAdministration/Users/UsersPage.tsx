import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { UserCreateEditButton } from "~/FormMeta/User/UserFormMeta"
import { getUserTableColumns } from "~/FormMeta/User/UserTableColumns"

export const UsersPage = () => {
  return (
    <SearchPage
      title="Users"
      blocks={[<UserCreateEditButton />]}
      tableProps={getUserTableColumns()}
      defaultFilter={{}}
    />
    // <SearchPage title="Users" tableProps={getUserTableColumns()} defaultFilter={{}} />
  )
}
