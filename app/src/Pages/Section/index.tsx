import React, { useState } from "react"
import { Button } from "antd"
import SearchPage from "~/Component/Common/Page/SearchPage"
import SectionSearchFilterMeta from "~/FormMeta/Section/SectionSearchFilterMeta"
import { RouteComponentProps } from "react-router-dom"
import SectionFormModal from "~/Component/Section/CreateEdit/SectionFormModal"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"

export default function Offering(props: RouteComponentProps<{ offeringID: string }>) {
  const offeringID = Number(props.match.params.offeringID)
  const [showModal, setShowModal] = useState(false)

  return (
    <SearchPage
      blocks={[
        <>
          {setShowModal && (
            <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
              + Create Section
            </Button>
          )}
          {showModal && <SectionFormModal OfferingID={offeringID} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      hideSearchField={false}
      title="Manage Sections"
      meta={SectionSearchFilterMeta}
      tableProps={getSectionTableColumns()}
    ></SearchPage>
  )
}
