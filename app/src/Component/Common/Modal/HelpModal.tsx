import { Button } from "antd"
import React from "react"
import Modal from "~/Component/Common/Modal/index2"

export function HelpModal({ helpKey, closeModal }: { helpKey: string; closeModal: () => void }) {
  return (
    <Modal width="800px">
      <div>
        <Button style={{ position: "absolute", right: 0 }} onClick={closeModal} type="primary" danger>
          X
        </Button>
        <iframe title="helpViewer" style={{ width: "100%", height: "100vh" }} src={helpKey} />
      </div>
    </Modal>
  )
}
