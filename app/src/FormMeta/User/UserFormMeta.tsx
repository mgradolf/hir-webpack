import React, { useState } from "react"
import { FormModal } from "~/Component/Common/Modal/FormModal"
import { Button } from "antd"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { saveUser } from "~/ApiServices/Service/UserService"

export const UserSearchMeta: IFilterField[] = [
  { label: "UserID", inputType: "TEXT", fieldName: "UserID" }, //:"test123",
  { label: "FirstName", inputType: "TEXT", fieldName: "FirstName" }, //:"t1",
  { label: "LastName", inputType: "TEXT", fieldName: "LastName" }, //: "l1",
  { label: "MiddleName", inputType: "TEXT", fieldName: "MiddleName" }, //: "",
  { label: "Email", inputType: "TEXT", fieldName: "Email" }, //: "iftear@gmail.com",
  { label: "Password", inputType: "TEXT", fieldName: "Password" }, //:"123",
  { label: "Roles", inputType: "TEXT", fieldName: "Roles" } //: [
  // "everybody"
  // ]
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
