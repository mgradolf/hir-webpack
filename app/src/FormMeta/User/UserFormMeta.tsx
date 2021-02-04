import { IField, MULTI_SELECT_DROPDOWN, TEXT } from "~/Component/Common/Form/common"
import { findAllUserRoles } from "~/ApiServices/Service/UserService"

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
    refLookupService: () => findAllUserRoles({}),
    displayKey: "RoleName",
    valueKey: "RoleName"
  }
]
