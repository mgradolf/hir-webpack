import React, { useState } from "react"
import { Button, Tooltip } from "antd"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { removeOffering } from "~/ApiServices/Service/OfferingService"
import { Redirect } from "react-router"
import { DeleteOutlined } from "@ant-design/icons"

interface IOfferingRemoveLinkProp {
  OfferingId: number
  HasSection: boolean
}
export function OfferingRemoveLink(props: IOfferingRemoveLinkProp) {
  const [redirectAfterRemove, setRedirectAfterRemove] = useState<string>()

  return (
    <>
      {redirectAfterRemove && <Redirect to={redirectAfterRemove} />}
      <Tooltip title="Remove">
        <Button
          danger
          disabled={props.HasSection}
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
      </Tooltip>
    </>
  )
}
