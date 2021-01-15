import React, { useState } from "react"
import { FormModal } from "~/Component/Common/Modal/FormModal"
import { Button } from "antd"
import { IFilterField, MULTI_SELECT_DROPDOWN, TEXT } from "~/Component/Common/SearchFilters/common"
import { findAllUserRoles, saveUser } from "~/ApiServices/Service/UserService"

export const UserSearchMeta: IFilterField[] = [
  { label: "UserID", inputType: TEXT, fieldName: "UserID" },
  { label: "FirstName", inputType: TEXT, fieldName: "FirstName" },
  { label: "LastName", inputType: TEXT, fieldName: "LastName" },
  { label: "MiddleName", inputType: TEXT, fieldName: "MiddleName" },
  { label: "Email", inputType: TEXT, fieldName: "Email" },
  { label: "Password", inputType: TEXT, fieldName: "Password" },
  {
    label: "Roles",
    inputType: MULTI_SELECT_DROPDOWN,
    fieldName: "Roles",
    refLookupService: findAllUserRoles,
    displayKey: "RoleName",
    valueKey: "RoleName"
  }
]

export const UserCreateButton = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onClick={() => setShowModal(true)}>+ Create User</Button>
      {showModal && (
        <FormModal
          title="Create User"
          meta={UserSearchMeta}
          formSubmitApi={saveUser}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
