import React from "react"
import { Menu } from "antd"
import ResolutionModalOpenButton from "~/Component/Feature/Section/Request/ResolutionModalOpenButton"

interface IRequestDetailsMenu {
  taskJson: any
  extraDataSource: any
}

export default function RequestDetailsMenu(props: IRequestDetailsMenu) {
  const resolutions = props.taskJson.Issues[0].Resolutions

  return (
    <Menu>
      {resolutions.map((x: any, i: any) => (
        <Menu.Item key={i}>
          <ResolutionModalOpenButton
            resolutionJson={x}
            taskJson={props.taskJson}
            extraDataSource={props.extraDataSource}
          />
        </Menu.Item>
      ))}
    </Menu>
  )
}
