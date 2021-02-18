import React from "react"
import { saveUser } from "~/ApiServices/Service/UserService"
import { FormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { UserSearchMeta } from "~/TableSearchMeta/User/UserFormMeta"
import { getUserTableColumns } from "~/TableSearchMeta/User/UserTableColumns"

export default function () {
  return (
    <SearchPage
      title="Users"
      blocks={[
        <FormModalOpenButton
          buttonLabel={"+ Create User"}
          formTitle={"Create User"}
          formMeta={UserSearchMeta}
          formSubmitApi={saveUser}
        />
      ]}
      tableProps={getUserTableColumns()}
      defaultFormValue={{}}
    />
    // <SearchPage title="Users" tableProps={getUserTableColumns()} defaultFormValue={{}} />
  )
}
