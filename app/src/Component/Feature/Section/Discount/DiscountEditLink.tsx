import React, { useState } from "react"
import { Button } from "antd"
import DiscountEditFormModal from "~/Component/Section/Discount/DiscountEditFormModal"

interface IDiscountEditLinkProp {
  sectionId: number
  sectionDiscountId: number
}

export default function DiscountEditLink(props: IDiscountEditLinkProp) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button
        type="link"
        onClick={() => {
          setOpenModal(true)
        }}
      >
        Edit
      </Button>
      {openModal && (
        <DiscountEditFormModal
          sectionId={props.sectionId}
          sectionDiscountId={props.sectionDiscountId}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  )
}
