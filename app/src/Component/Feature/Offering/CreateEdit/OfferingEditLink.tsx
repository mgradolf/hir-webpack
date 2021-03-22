import React, { useState } from "react"
import { Button } from "antd"
import OfferingFormModal from "~/Component/Offering/CreateEdit/OfferingFormModal"

interface IOfferingEditLinkProp {
  OfferingId: number
}
export default function OfferingEditLink(props: IOfferingEditLinkProp) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Button
        type={"ghost"}
        onClick={() => {
          setOpenModal(true)
        }}
      >
        Edit
      </Button>
      {openModal && <OfferingFormModal closeModal={() => setOpenModal(false)} offeringId={props.OfferingId} />}
    </>
  )
}
