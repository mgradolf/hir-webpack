import React, { useState } from "react"
import { Button } from "antd"
import DiscountEditFormModal from "~/Component/Feature/Section/Discount/DiscountEditFormModal"
import { EditOutlined } from "@ant-design/icons"

interface IDiscountEditLinkProp {
  sectionId: number
  sectionDiscountId: number
}

export default function DiscountEditLink(props: IDiscountEditLinkProp) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button
        type="primary"
        icon={<EditOutlined />}
        shape="circle"
        style={{ marginRight: "5px" }}
        onClick={() => {
          setOpenModal(true)
        }}
      />
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
