import React from "react"
import GoToMenu from "~/Component/Common/GoToMenu"

interface IRequestMenu {
  request: { [key: string]: any }
  sectionId: number
}

export default function RequestMenu(props: IRequestMenu) {
  const menus = [{ title: "View Details", url: `/section/${props.sectionId}/request/${props.request.RequestID}` }]
  return <GoToMenu menuList={menus} />
}
