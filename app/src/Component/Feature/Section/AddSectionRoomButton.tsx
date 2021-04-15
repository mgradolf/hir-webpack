import React, { useState } from "react"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { AddSectionRoomModal } from "~/Component/Feature/Section/AddSectionRoomModal"
import { Button, Typography } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { updateSection } from "~/ApiServices/Service/SectionService"

interface IAddSectionRoomButtonProp {
  SectionID: number
  Locations: string
}

export function AddSectionRoomButton(props: IAddSectionRoomButtonProp) {
  const [openModal, setOpenModal] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const onClick = () => {
    setOpenModal(true)
  }

  const onClose = (selectedItems?: any) => {
    if (selectedItems) {
      setApiCallInProgress(true)
      updateSection({ SectionID: props.SectionID, ...selectedItems }).then((x) => {
        if (x.success) eventBus.publish(REFRESH_PAGE)
        setApiCallInProgress(false)
        setOpenModal(false)
      })
    } else {
      setOpenModal(false)
    }
  }

  return (
    <>
      <Typography.Text>{props.Locations}</Typography.Text>
      {openModal && <AddSectionRoomModal apiCallInProgress={apiCallInProgress} {...props} onClose={onClose} />}
      <Button type="default" icon={<EditOutlined />} shape="circle" onClick={onClick} style={{ float: "right" }} />
    </>
  )
}
