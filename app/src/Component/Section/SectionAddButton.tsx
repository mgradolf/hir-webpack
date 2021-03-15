import React, { useState } from "react"
import { Button } from "antd"
import { addSectionProduct } from "~/ApiServices/BizApi/product/productIf"
import { addSectionDiscount } from "~/ApiServices/Service/SectionService"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { eventBus, REFRESH_SECTION_DISCOUNT_PAGE, REFRESH_SECTION_PRODUCT_PAGE } from "~/utils/EventBus"
import { getSectionTableColumns } from "~/TableSearchMeta/Section/SectionTableColumns"
import { SectionSearchMeta } from "~/TableSearchMeta/Section/SectionSearchMeta"

interface ICreateActionButtonProp {
  ProductId?: number
  DiscountProgramID?: number
}

export default function SectionAddButton(props: ICreateActionButtonProp) {
  const [showModal, setShowModal] = useState(false)

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      if (props.ProductId) {
        items.map((x) => {
          addSectionProduct([x.SectionID, [props.ProductId]]).then((x) => {
            if (x.success) eventBus.publish(REFRESH_SECTION_PRODUCT_PAGE)
          })
          return true
        })
        setShowModal(false)
      } else if (props.DiscountProgramID) {
        items.map((x) => {
          addSectionDiscount({ SectionID: x.SectionID, DiscountProgramID: props.DiscountProgramID }).then((x) => {
            if (x.success) eventBus.publish(REFRESH_SECTION_DISCOUNT_PAGE)
          })
          return true
        })
        setShowModal(false)
      }
    } else {
      setShowModal(false)
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => setShowModal(true)}>
        + Add Section
      </Button>
      {showModal && (
        <LookupModal
          title="Select Section"
          isArray={true}
          closeModal={closeModal}
          {...getSectionTableColumns(true)}
          meta={SectionSearchMeta}
          metaName="SectionSearchMeta"
          defaultFormValue={{}}
        />
      )}
    </>
  )
}
