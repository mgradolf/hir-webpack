import React, { useState } from "react"
import { Button } from "antd"
import AddDiscountModal from "~/Component/Discount/AddDiscountModal"
import { addSectionDiscount } from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_DISCOUNT_PAGE } from "~/utils/EventBus"

interface ICreateActionButtonProp {
  sectionId: number
}

export function AddDiscountButton(props: ICreateActionButtonProp) {
  const [openModal, setOpenModal] = useState(false)
  const onClick = () => {
    setOpenModal(true)
  }

  const onClose = (selectedItems?: any[]) => {
    if (selectedItems) {
      const discountProgramID = selectedItems[0].DiscountProgramID

      addSectionDiscount({ SectionID: props.sectionId, DiscountProgramID: discountProgramID })
        .then(() => eventBus.publish(REFRESH_SECTION_DISCOUNT_PAGE))
        .finally(() => setOpenModal(false))
    } else {
      setOpenModal(false)
    }
  }
  return (
    <>
      {openModal && <AddDiscountModal {...props} onClose={onClose} />}
      <Button type="primary" onClick={onClick}>
        + Add Discount Program
      </Button>
    </>
  )
}
