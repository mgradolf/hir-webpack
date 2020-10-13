import React from "react"
import GoToMenu, { IMenu } from "~/Component/Common/GoToMenu"

interface ISectionMenu {
  section: { [key: string]: any }
}

export default function SectionMenu(props: ISectionMenu) {
  const menus: IMenu[] = [
    {
      title: "Basic",
      url: "#",
      items: [
        { title: "Seatgroup", url: `/section/${props.section.SectionID}/seatgroup` },
        { title: "Budget", url: `/section/${props.section.SectionID}/budget` },
        { title: "Discount", url: `/section/${props.section.SectionID}/discount` },
        { title: "Schedule", url: `/section/${props.section.SectionID}/schedule` },
        { title: "Catalog", url: `/section/${props.section.SectionID}/catalog` },
        { title: "Email Notification", url: `/section/${props.section.SectionID}/notification` },
        { title: "Question", url: `/section/${props.section.SectionID}/question` },
        { title: "Registration", url: `/section/${props.section.SectionID}/registration` },
        { title: "Tag", url: `/section/${props.section.SectionID}/tag` },
        { title: "Requests", url: `/section/${props.section.SectionID}/request` },
        { title: "Order Management", url: `/section/${props.section.SectionID}/order-management` },
        { title: "Products", url: `/section/${props.section.SectionID}/product` },
        { title: "Waitlist Entries", url: `/section/${props.section.SectionID}/waitlist` },
        { title: "Comment", url: `/section/${props.section.SectionID}/comment` }
      ]
    },
    {
      title: "Logs",
      url: "#",
      items: [
        { title: "Academic Log", url: `/section/${props.section.SectionID}/academic` },
        { title: "Enrollment Log", url: `/section/${props.section.SectionID}/enrollment` },
        { title: "Order Log", url: `/section/${props.section.SectionID}/order` }
      ]
    }
  ]
  return <GoToMenu menuList={menus} />
}
