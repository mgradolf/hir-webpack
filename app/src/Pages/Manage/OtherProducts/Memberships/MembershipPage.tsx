import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { MembershipSearchMeta } from "~/TableSearchMeta/Membership/MembershipSearchMeta"
import { getMembershipTableColumns } from "~/TableSearchMeta/Membership/MembershipTableColumns"

export default function MembershipPage() {
  return (
    <SearchPage
      title="Manage Memberships"
      meta={MembershipSearchMeta}
      metaName="MembershipSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getMembershipTableColumns()
      }}
    ></SearchPage>
  )
}
