import React from "react"
import { Button } from "antd"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IOfferingRemoveLinkProp {
  OfferingId: number
}
export default function OfferingRemoveLink(props: IOfferingRemoveLinkProp) {
  return (
    <>
      <Button
        danger
        type="primary"
        style={{ marginLeft: "5px" }}
        onClick={() =>
          showDeleteConfirm(() => {
            console.log("no remove function provided")
            return Promise.resolve({ code: 200, data: undefined, error: undefined, success: false })
          })
        }
      >
        Remove
      </Button>
    </>
  )
}
