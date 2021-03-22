import React, { useState } from "react"
import { Button } from "antd"
import { WaitlistEntriesSearchMeta } from "~/TableSearchMeta/WaitlistEntries/WaitlistEntriesSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getWaitlistEntriesTableColumns } from "~/TableSearchMeta/WaitlistEntries/WaitlistEntryTableColumns"
import { WaitlistEntryFormOpenButton } from "~/Component/Feature/WaitlistEntries/WaitlistEntryForm"

export default function WaitlistEntryPage() {
  const [entry, setEntry] = useState<{ [key: string]: any }>()
  const [showCreateModal, setShowCreateModal] = useState(false)
  return (
    <>
      {showCreateModal && <WaitlistEntryFormOpenButton />}
      <SearchPage
        title="Waitlist Entries"
        meta={WaitlistEntriesSearchMeta}
        metaName="WaitlistEntriesSearchMeta"
        hideSearchField={false}
        blocks={[
          <>
            <Button
              style={{ float: "right", zIndex: 11, marginTop: "22px", marginRight: "17px" }}
              type="primary"
              onClick={() => {
                setShowCreateModal(true)
              }}
            >
              + Add Waitlist Entry
            </Button>
          </>
        ]}
        tableProps={{
          ...getWaitlistEntriesTableColumns(false, (record) => {
            setShowCreateModal(true)
            setEntry(record)
          })
        }}
      ></SearchPage>
    </>
  )
}
