import * as React from "react"
import { AccountSearchMeta } from "~/TableSearchMeta/Account/AccountSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getAccountTableColumns } from "~/TableSearchMeta/Account/AccountTableColumns"

export function AccountLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Account"
      placeholder="Search By Account Name"
      valueKey={props.valueKey || "AccountID"}
      displayKey={"AccountName"}
      {...getAccountTableColumns(true)}
      meta={AccountSearchMeta as IField[]}
      metaName="AccountSearchMeta"
      {...props}
    />
  )
}
