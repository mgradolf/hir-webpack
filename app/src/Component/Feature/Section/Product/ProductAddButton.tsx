import React, { useState } from "react"
import { addSectionProduct } from "~/ApiServices/BizApi/product/productIf"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { ProductSearchMeta } from "~/TableSearchMeta/Product/ProductSearchMeta"
import { getProductTableColumns } from "~/TableSearchMeta/Product/ProductTableColumns"
import { eventBus } from "~/utils/EventBus"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface ICreateActionButtonProp {
  SectionId: number
}
export function ProductAddButton(props: ICreateActionButtonProp) {
  const [showModal, setShowModal] = useState(false)
  const modifiedMeta = ProductSearchMeta.filter((x) => {
    return (
      x.fieldName !== "ProductIsActive" &&
      x.fieldName !== "ProductOptionalItem" &&
      x.fieldName !== "ProductInventoryUnits"
    )
  })

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      addSectionProduct([props.SectionId, items.map((x) => x.ProductID)])
        .then((x) => {
          if (x.success) eventBus.publish("REFRESH_SECTION_PRODUCT_PAGE_1")
        })
        .finally(() => {
          setShowModal(false)
        })
    } else {
      setShowModal(false)
    }
  }

  return (
    <>
      <IconButton toolTip="Add Product" iconType="create" onClick={() => setShowModal && setShowModal(true)} />
      {showModal && (
        <LookupModal
          title="Select Product"
          isArray={true}
          closeModal={closeModal}
          {...getProductTableColumns()}
          meta={modifiedMeta}
          metaName="ProductSearchMeta"
          defaultFormValue={{ ProductOptionalItem: true, ProductInventoryUnits: 1, ProductIsActive: true }}
        />
      )}
    </>
  )
}
