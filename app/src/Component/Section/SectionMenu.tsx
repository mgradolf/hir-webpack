import React from "react"
import { Menu } from "antd"
import { Link } from "react-router-dom"

interface ISectionMenu {
  section: { [key: string]: any }
}
export default function SectionMenu(props: ISectionMenu) {
  const menus = [
    {
      title: "Seatgroup",
      url: `/section/${props.section.SectionID}/seatgroup`
    },
    {
      title: "Budget",
      url: `/section/${props.section.SectionID}/budget`
    },
    {
      title: "Discount",
      url: `/section/${props.section.SectionID}/discount`
    },
    {
      title: "Schedule",
      url: `/section/${props.section.SectionID}/schedule`
    },
    {
      title: "Catalog",
      url: `/section/${props.section.SectionID}/catalog`
    },
    {
      title: "Email Notification",
      url: `/section/${props.section.SectionID}/notification`
    },
    {
      title: "Question",
      url: `/section/${props.section.SectionID}/question`
    },
    {
      title: "Registration",
      url: `/section/${props.section.SectionID}/registration`
    },
    {
      title: "Tag",
      url: `/section/${props.section.SectionID}/tag`
    }
  ]
  return (
    <Menu>
      {menus.map((x, i) => (
        <Menu.Item key={i}>
          <Link to={x.url}>{x.title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}
