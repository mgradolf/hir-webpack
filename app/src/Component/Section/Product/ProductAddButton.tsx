import React, { useState } from "react"
import { Button } from "antd"
import { addSectionProduct } from "~/ApiServices/BizApi/product/productIf"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"
import { ProductSearchMeta } from "~/TableSearchMeta/Product/ProductSearchMeta"
import { getProductTableColumns } from "~/TableSearchMeta/Product/ProductTableColumns"
import { eventBus, REFRESH_SECTION_PRODUCT_PAGE } from "~/utils/EventBus"

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
          if (x.success) eventBus.publish(REFRESH_SECTION_PRODUCT_PAGE)
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
      <Button type="primary" onClick={() => setShowModal(true)}>
        + Add Product
      </Button>
      {showModal && (
        <LookupModal
          title="Select Product"
          isArray={true}
          closeModal={closeModal}
          {...getProductTableColumns()}
          meta={modifiedMeta}
          defaultFormValue={{ ProductOptionalItem: true, ProductInventoryUnits: 1, ProductIsActive: true }}
        />
      )}
    </>
  )
}
