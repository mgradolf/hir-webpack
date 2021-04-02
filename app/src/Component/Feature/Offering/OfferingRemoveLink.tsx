import React, { useState } from "react"
import { Button } from "antd"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { removeOffering } from "~/ApiServices/Service/OfferingService"
import { Redirect } from "react-router"
import { DeleteOutlined } from "@ant-design/icons"

interface IOfferingRemoveLinkProp {
  OfferingId: number
}
export function OfferingRemoveLink(props: IOfferingRemoveLinkProp) {
  const [redirectAfterRemove, setRedirectAfterRemove] = useState<string>()

  return (
    <>
      {redirectAfterRemove && <Redirect to={redirectAfterRemove} />}
      <Button
        danger
        type="primary"
        shape="circle"
        icon={<DeleteOutlined />}
        style={{ marginLeft: "5px" }}
        onClick={() =>
          showDeleteConfirm(() => {
            return removeOffering({ OfferingID: props.OfferingId }).then((x) => {
              if (x.success) {
                setRedirectAfterRemove(`/offering`)
              }
              return x
            })
          })
        }
      />
    </>
  )
}
