import React, { useState } from "react"
import { Button, Card, Col, Input, message, Row } from "antd"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import Modal from "~/Component/Common/Modal/index2"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import zIndex from "~/utils/zIndex"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IBuyer, IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { ProductSearchMeta } from "~/TableSearchMeta/Product/ProductSearchMeta"
import { getProductTableColumns } from "~/TableSearchMeta/Product/ProductTableColumns"

export const AddProductModal = (props: {
  buyer: IBuyer
  itemList: IItemRequest[]
  cartModelFunctionality: CartModelFunctionality
}) => {
  const [showModal, setShowModal] = useState(false)
  const [searchParams, setSearchParams] = useState<any>()
  const [selectedItem, setSelectedItem] = useState<any>()
  const [loading, setLoading] = useState(false)

  const closeModal = () => {
    setLoading(false)
    setSearchParams(undefined)
    setSelectedItem(undefined)
    setShowModal(false)
  }

  return (
    <>
      <Button
        onClick={() => {
          if (props.buyer && props.buyer.PersonID) {
            setShowModal(true)
          } else {
            message.warning("You must Select a Buyer first!", 5)
          }
        }}
        type="link"
      >
        Buy Product
      </Button>
      {showModal && props.buyer && props.buyer.PersonID && (
        <Modal width="1000px" zIndex={zIndex.defaultModal + 1} apiCallInProgress={loading || loading || loading}>
          <Card
            title="Select Product"
            actions={[
              <Button type="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>,
              <Row justify="center">
                <Col span={12}>
                  <Input.Search
                    type="number"
                    disabled={!selectedItem}
                    loading={loading}
                    onSearch={(seatCount: string) => {
                      if (seatCount && !isNaN(Number(seatCount))) {
                        setLoading(true)
                        props.cartModelFunctionality &&
                          props.buyer &&
                          props.buyer.PersonID &&
                          props.cartModelFunctionality
                            .createProductRequest(selectedItem.ProductID, props.buyer.PersonID, Number(seatCount))
                            .then((response) => {
                              if (response.success) {
                                setLoading(true)
                                closeModal()
                              }
                            })
                      }
                    }}
                    enterButton=" Quantity"
                  />
                </Col>
              </Row>
            ]}
          >
            <div className="modal-card">
              <MetaDrivenForm
                meta={ProductSearchMeta}
                onApplyChanges={(newSearchParams, newSearchParamsCount) => {
                  setSearchParams({ ...newSearchParams, programStatusCodeID: 3, hasApplicationProcess: true })
                }}
                stopProducingQueryParams={true}
              />
              <ResponsiveTable
                {...getProductTableColumns(true)}
                searchParams={searchParams}
                refreshEventName="REFRESH_PRODUCT_SHOP"
                isModal={true}
                rowSelection={{
                  type: "radio",
                  onChange: (selectedRowKeys: any, selectedRows: any) => {
                    setSelectedItem(selectedRows[0])
                  }
                }}
              />
            </div>
          </Card>
        </Modal>
      )}
    </>
  )
}
