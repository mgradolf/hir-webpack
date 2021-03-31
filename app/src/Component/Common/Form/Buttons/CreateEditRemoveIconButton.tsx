import React from "react"
import { PlusCircleFilled, EditFilled, DeleteFilled } from "@ant-design/icons"

export type iconType = "create" | "edit" | "remove"

export const CreateEditRemoveIconButton = (props: {
  onClick: () => void
  iconType: iconType
  inProgress?: boolean
}) => {
  const onClick = () => {
    if (props.iconType === "remove") {
      if (props.inProgress !== undefined && !props.inProgress) {
        props.onClick()
      }
    } else {
      props.onClick()
    }
  }
  if (props.iconType === "create")
    return (
      <PlusCircleFilled
        style={{
          color: "#1990ff",
          fontSize: "20px",
          // paddingTop: "10px",
          paddingRight: "10px",
          paddingBottom: "10px"
        }}
        onClick={onClick}
      />
    )
  else if (props.iconType === "edit") {
    return (
      <EditFilled
        style={{
          color: "#1990ff",
          fontSize: "20px",
          // paddingTop: "10px",
          paddingRight: "10px",
          paddingBottom: "10px"
        }}
        onClick={onClick}
      />
    )
  } else if (props.iconType === "remove") {
    return (
      <DeleteFilled
        style={{
          color: "#ff4d4f",
          fontSize: "20px",
          // paddingTop: "10px",
          paddingRight: "10px",
          paddingBottom: "10px"
        }}
        onClick={onClick}
      />
    )
  }
  return null
}
