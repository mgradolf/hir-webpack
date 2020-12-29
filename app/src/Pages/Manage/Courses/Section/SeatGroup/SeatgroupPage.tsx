import React, { useState } from "react"
import { Button } from "antd"
import { RouteComponentProps } from "react-router-dom"
import { getSectionSeatgroupTableColumns } from "~/FormMeta/SectionSeatgroup/SeatgroupTableColumns"
import StandardPage from "~/Component/Common/Page/StandardPage"
import CreateSeatGroup from "~/Component/Section/SeatGroup/SectionSeatGroupFormModal"

export default function SeatgroupPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [showModal, setShowModal] = useState(false)

  return (
    <StandardPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Seat Group
          </Button>
          {showModal && <CreateSeatGroup sectionId={SectionID} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Seat Groups"
      tableProps={{ ...getSectionSeatgroupTableColumns() }}
      initialFilter={{ SectionID: SectionID }}
    />
  )
}
