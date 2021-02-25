import * as React from "react"
import { AccountSearchMeta } from "~/TableSearchMeta/Account/AccountSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getAccountTableColumns } from "~/TableSearchMeta/Account/AccountTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function AccountLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Account"
      valueField={props.valueField || "AccountID"}
      displayField={"AccountName"}
      {...getAccountTableColumns(true)}
      meta={AccountSearchMeta as IField[]}
      {...props}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Account", props.defaultValue).then((x) => {
            if (x.success) x.data["AccountName"] = x.data.Name
            console.log(x)
            return x.data
          })
      })}
    />
  )
}
