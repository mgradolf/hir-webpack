import React, { useState } from "react"
import AddDiscountModal from "~/Component/Feature/Discount/AddDiscountModal"
import { addSectionDiscount } from "~/ApiServices/Service/SectionService"
import { eventBus } from "~/utils/EventBus"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface ICreateActionButtonProp {
  sectionId: number
}

export function AddDiscountButton(props: ICreateActionButtonProp) {
  const [openModal, setOpenModal] = useState(false)

  const onClose = (selectedItems?: any[]) => {
    if (selectedItems) {
      const discountProgramID = selectedItems[0].DiscountProgramID

      addSectionDiscount({ SectionID: props.sectionId, DiscountProgramID: discountProgramID })
        .then(() => eventBus.publish("REFRESH_SECTION_DISCOUNT_PAGE_1"))
        .finally(() => setOpenModal(false))
    } else {
      setOpenModal(false)
    }
  }
  return (
    <>
      {openModal && <AddDiscountModal {...props} onClose={onClose} />}
      <IconButton toolTip="Add Discount Program" iconType="create" onClick={() => setOpenModal && setOpenModal(true)} />
    </>
  )
}
