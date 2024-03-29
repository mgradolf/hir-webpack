import React from "react"
import { WaitlistEntriesSearchMeta } from "~/TableSearchMeta/WaitlistEntries/WaitlistEntriesSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getWaitlistEntriesTableColumns } from "~/TableSearchMeta/WaitlistEntries/WaitlistEntryTableColumns"
import { WaitlistEntryFormOpenButton } from "~/Component/Feature/WaitlistEntries/WaitlistEntryForm"

export default function WaitlistEntryPage() {
  return (
    <>
      <SearchPage
        title="Waitlist Entries"
        helpKey="courseSearchWaitlistEntries"
        meta={WaitlistEntriesSearchMeta}
        metaName="WaitlistEntriesSearchMeta"
        hideSearchField={false}
        blocks={[<WaitlistEntryFormOpenButton editMode={false} />]}
        tableProps={{
          ...getWaitlistEntriesTableColumns(false)
        }}
      ></SearchPage>
    </>
  )
}
