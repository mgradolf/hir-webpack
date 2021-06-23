import { Button, Card, message } from "antd"
import React, { useEffect, useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { renderBoolean, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import zIndex from "~/utils/zIndex"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"

export const PromoTable = (props: {
  promos: IRegistrationPromo[]
  cartModelFunctionality: CartModelFunctionality
  disable: boolean
}) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => setSelectedRowKeys([]), [])

  return (
    <>
      {props.promos.length > 0 && (
        <>
          <Button
            disabled={props.disable}
            type="primary"
            onClick={() => {
              setShowModal(true)
            }}
          >
            Promo Available
          </Button>
          {showModal && (
            <Modal zIndex={zIndex.defaultModal} width="1000px" loading={loading} loadingTip="Applying Promo ...">
              <Card
                title="Discount Details"
                actions={[
                  <Button onClick={() => setShowModal(false)}>Close</Button>,
                  <Button
                    type="primary"
                    onClick={() => {
                      setLoading(true)
                      props.cartModelFunctionality.addPromo(selectedRowKeys).then((response) => {
                        if (response.success) {
                          setShowModal(false)
                          setLoading(false)
                        } else message.error(response.error)
                      })
                    }}
                  >
                    Apply
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
                  dataSource={(props.promos as any[]).map((x) => {
                    x.rowKey = x.SectionDiscountID
                    return x
                  })}
                  // rowKey="row"
                  rowSelection={{
                    selectedRowKeys,
                    type: "checkbox",
                    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
                      setSelectedRowKeys(selectedRowKeys)
                    }
                  }}
                />
              </Card>
            </Modal>
          )}
        </>
      )}
    </>
  )
}
