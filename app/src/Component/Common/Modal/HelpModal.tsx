import { Button } from "antd"
import React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { CloseCircleFilled } from "@ant-design/icons"

export function HelpModal({ helpKey, closeModal }: { helpKey: string; closeModal: () => void }) {
  return (
    <Modal width="100%">
      <div>
        <Button
          style={{ position: "absolute", right: 0 }}
          onClick={closeModal}
          type="primary"
          danger
          icon={<CloseCircleFilled />}
        />
        <iframe
          title="helpViewer"
          style={{ width: "100%", height: "100vh" }}
          src={process.env.REACT_APP_HELP_FILE_URL + helpKey}
        />
      </div>
    </Modal>
  )
}
