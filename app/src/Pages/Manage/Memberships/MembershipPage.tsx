import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { MembershipSearchMeta } from "~/FormMeta/Membership/MembershipSearchMeta"
import { getMembershipTableColumns } from "~/FormMeta/Membership/MembershipTableColumns"

export default function MembershipPage() {
  return (
    <SearchPage
      title="Manage Memberships"
      meta={MembershipSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getMembershipTableColumns()
      }}
    ></SearchPage>
  )
}
