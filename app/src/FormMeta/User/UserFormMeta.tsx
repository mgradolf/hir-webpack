import { IField, MULTI_SELECT_CHECKBOX, TEXT } from "~/Component/Common/Form/common"
import { findAllUserRoles } from "~/ApiServices/Service/UserService"

export const UserSearchMeta: IField[] = [
  { label: "UserID", inputType: TEXT, fieldName: "UserID" },
  { label: "FirstName", inputType: TEXT, fieldName: "FirstName" },
  { label: "LastName", inputType: TEXT, fieldName: "LastName" },
  {
    label: "Roles",
    inputType: MULTI_SELECT_CHECKBOX,
    fieldName: "Roles",
    refLookupService: () => findAllUserRoles({}),
    displayKey: "RoleName",
    valueKey: "RoleName"
  },
  { label: "MiddleName", inputType: TEXT, fieldName: "MiddleName" },
  { label: "Email", inputType: TEXT, fieldName: "Email" },
  { label: "Password", inputType: TEXT, fieldName: "Password" }
]
