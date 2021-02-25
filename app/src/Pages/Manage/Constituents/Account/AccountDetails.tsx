import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getAccountDetailsMeta } from "~/TableSearchMeta/Account/AccountDetailsMeta"

export default function AccountDetailsPage(props: RouteComponentProps<{ accountID: string }>) {
  const AccountID = Number(props?.match?.params?.accountID)
  return (
    <DetailsPage
      getMeta={getAccountDetailsMeta}
      getDetails={() =>
        findAccountForLookUp({ AccountID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      entityType="Account"
      entityID={AccountID}
    />
  )
}
