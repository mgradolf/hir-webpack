import React, { useState } from "react"
import { FormModal } from "~/Component/Common/Modal/FormModal"
import { Button } from "antd"
import { IField, MULTI_SELECT_DROPDOWN, TEXT } from "~/Component/Common/Form/common"
import { findAllUserRoles, saveUser } from "~/ApiServices/Service/UserService"

export const UserSearchMeta: IField[] = [
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

export const UserCreateEditButton = (props: { Params?: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onClick={() => setShowModal(true)}>{props.Params ? "Edit User" : "+ Create User"}</Button>
      {showModal && (
        <FormModal
          title={props.Params ? "Edit User" : "Create User"}
          meta={UserSearchMeta}
          initialFilter={props.Params}
          formSubmitApi={saveUser}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
