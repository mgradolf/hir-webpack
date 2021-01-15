import React, { useState } from "react"
import { Button } from "antd"
import ViewResponseModal from "~/Component/Section/Request/ViewResponseModal"

interface IViewResponseProp {
  requestJson: any
}

export default function ViewResponseActionButton(props: IViewResponseProp) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setOpenModal && setOpenModal(true)}>
        View Response
      </Button>
      {openModal && <ViewResponseModal requestJson={props.requestJson} closeModal={() => setOpenModal(false)} />}
    </>
  )
}
