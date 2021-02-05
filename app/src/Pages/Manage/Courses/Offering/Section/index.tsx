import React, { useState } from "react"
import { Button } from "antd"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { SectionSearchMeta } from "~/FormMeta/Section/SectionSearchMeta"
import { RouteComponentProps } from "react-router-dom"
import SectionFormModal from "~/Component/Section/CreateEdit/SectionFormModal"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"

export default function Offering(props: RouteComponentProps<{ offeringID: string }>) {
  const OfferingID = Number(props.match.params.offeringID)
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
          {showModal && <SectionFormModal OfferingID={OfferingID} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      hideSearchField={true}
      title="Sections"
      meta={SectionSearchMeta}
      defaultFormValue={{ OfferingID }}
      tableProps={getSectionTableColumns()}
      helpKey="https://docs.google.com/document/d/1FKV-i5gsVClhsHLYFMqpdEGDVZmwJU576AXKKcTfwiY/edit?usp=sharing"
    ></SearchPage>
  )
}
