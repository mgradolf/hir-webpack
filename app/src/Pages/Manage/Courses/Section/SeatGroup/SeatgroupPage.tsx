import React, { useState } from "react"
import { Button } from "antd"
import { RouteComponentProps } from "react-router-dom"
import { getSeatgroupTableColumns } from "~/TableSearchMeta/Seatgroup/SeatgroupTableColumns"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import CreateSeatGroup from "~/Component/Feature/Section/SeatGroup/SectionSeatGroupFormModal"

export default function SeatgroupPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [showModal, setShowModal] = useState(false)

  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Seat Group
          </Button>
          {showModal && <CreateSeatGroup sectionId={SectionID} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Seat Groups"
      tableProps={{ ...getSeatgroupTableColumns() }}
      initialFormValue={{ SectionID: SectionID }}
    />
  )
}
