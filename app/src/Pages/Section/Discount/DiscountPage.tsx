import React, { useState } from "react"
import { Button } from "antd"
import { RouteComponentProps } from "react-router-dom"
import StandardPage from "~/Component/Common/Page/StandardPage"
import CreateNewDiscount from "~/Component/Section/Discount/DiscountFormModal"
import { getSectionDiscountTableColumns } from "~/FormMeta/SectionDiscount/DiscountTableColumns"
import { REFRESH_SECTION_DISCOUNT_PAGE } from "~/utils/EventBus"

export default function DiscountPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [showModal, setShowModal] = useState(false)

  return (
    <StandardPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Add Discount Program
          </Button>
          {showModal && <CreateNewDiscount sectionId={SectionID} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Discount Programs"
      tableProps={{ ...getSectionDiscountTableColumns(), refreshEventName: REFRESH_SECTION_DISCOUNT_PAGE }}
      initialFilter={{ SectionID: SectionID }}
    />
  )
}
