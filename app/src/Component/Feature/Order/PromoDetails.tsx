import { Button, Card } from "antd"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { renderBoolean, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import zIndex from "~/utils/zIndex"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export const PromoDetails = (props: { item: IRegistrationRequest; cartModelFunctionality: CartModelFunctionality }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button
        type="link"
        onClick={() => {
          setShowModal(true)
        }}
      >
        {props.item.AvailablePromoCode ? props.item.AvailablePromoCode.Amount : "0"}
      </Button>
      {showModal && (
        <Modal zIndex={zIndex.defaultModal} width="1000px">
          <Card
            title="Discount Details"
            actions={[
              <Button onClick={() => setShowModal(false)}>Close</Button>,
              <Button
                danger
                onClick={() => {
                  props.cartModelFunctionality.addRemovePromo(props.item, false)
                  setShowModal(false)
                }}
              >
                Remove
              </Button>
            ]}
          >
            <ResponsiveTable
              columns={[
                { title: "Promo", dataIndex: "ShortName" },
                { title: "Description", dataIndex: "Name" },
                { title: "Type", dataIndex: "AmountType" },
                { title: "Promoted", dataIndex: "IsPromotedForMarketing", render: renderBoolean }
              ]}
              hidePagination={true}
              disableSorting={true}
              dataSource={[props.item.AvailablePromoCode || {}]}
            />
          </Card>
        </Modal>
      )}
    </>
  )
}
