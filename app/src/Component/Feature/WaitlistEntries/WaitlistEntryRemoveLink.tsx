import React, { useState } from "react"
import { Button, Tooltip } from "antd"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { Redirect } from "react-router"
import { DeleteOutlined } from "@ant-design/icons"
import { deleteWaitListEntry } from "~/ApiServices/Service/WaitlistEntryService"

interface IWaitlistEntryRemoveLinkProp {
  WaitListEntryID: number
}
export function WaitlistEntryRemoveLink(props: IWaitlistEntryRemoveLinkProp) {
  const [redirectAfterRemove, setRedirectAfterRemove] = useState<string>()

  return (
    <>
      {redirectAfterRemove && <Redirect to={redirectAfterRemove} />}
      <Tooltip title="Remove">
        <Button
          danger
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          style={{ marginLeft: "5px" }}
          onClick={() =>
            showDeleteConfirm(() => {
              return deleteWaitListEntry({ WaitListEntryID: props.WaitListEntryID }).then((x) => {
                if (x.success) {
                  setRedirectAfterRemove(`/waitlist`)
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
