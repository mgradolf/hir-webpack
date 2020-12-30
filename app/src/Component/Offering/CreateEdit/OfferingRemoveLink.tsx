import React from "react"
import { Button } from "antd"

interface IOfferingRemoveLinkProp {
  OfferingId: number
}
export default function OfferingRemoveLink(props: IOfferingRemoveLinkProp) {
  return (
    <>
      <Button danger style={{ marginLeft: "5px" }}>
        Remove
      </Button>
    </>
  )
}
