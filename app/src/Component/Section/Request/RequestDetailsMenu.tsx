import React from "react"
import { PROCESSED_REQUEST_STATE_ID, ACTION_REQUIRED_REQUEST_STATE_ID } from "~/utils/Constants"
import GoToMenu from "~/Component/Common/GoToMenu"

interface IRequestDetailsMenu {
  task: { [key: string]: any }
}

export default function RequestDetailsMenu(props: IRequestDetailsMenu) {
  const menus = []

  if (props.task.StateID === PROCESSED_REQUEST_STATE_ID) {
    menus.push({ title: "View Record", url: `/request/` })
  } else if (props.task.StateID === ACTION_REQUIRED_REQUEST_STATE_ID) {
    const issues = props.task.Issues
    if (issues.length > 0) {
      const resolutions = issues[0].Resolutions
      for (let i = 0; i < resolutions.length; i++) {
        menus.push({ title: resolutions[i].Name, url: `/request/` })
      }
    }
  }

  return <GoToMenu menuList={menus} />
}
