import React from "react"
import GoToMenu from "~/Component/Common/GoToMenu"

interface ISectionMenu {
  section: { [key: string]: any }
}

export default function SectionMenu(props: ISectionMenu) {
  const menus = [
    { title: "Seatgroup", url: `/section/${props.section.SectionID}/seatgroup` },
    { title: "Budget", url: `/section/${props.section.SectionID}/budget` },
    { title: "Discount", url: `/section/${props.section.SectionID}/discount` },
    { title: "Schedule", url: `/section/${props.section.SectionID}/schedule` },
    { title: "Catalog", url: `/section/${props.section.SectionID}/catalog` },
    { title: "Email Notification", url: `/section/${props.section.SectionID}/notification` },
    { title: "Question", url: `/section/${props.section.SectionID}/question` },
    { title: "Registration", url: `/section/${props.section.SectionID}/registration` },
    { title: "Tag", url: `/section/${props.section.SectionID}/tag` },
    { title: "Requests", url: `/section/${props.section.SectionID}/request` }
  ]
  return <GoToMenu menuList={menus} />
}
