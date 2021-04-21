import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { UserSearchMeta } from "~/TableSearchMeta/User/UserFormMeta"
import { getUserTableColumns } from "~/TableSearchMeta/User/UserTableColumns"

export function UserLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select User"
      displayKey="name"
      searchFieldName="name"
      meta={UserSearchMeta as IField[]}
      metaName="UserSearchMeta"
      {...props}
      {...getUserTableColumns(true)}
      valueKey={props.valueKey || "erpid"}
    />
  )
}
