import React from "react"
import { Menu } from "antd"
import { Link } from "react-router-dom"

interface IOfferingMenu {
  offering: { [key: string]: any }
}
export default function OfferingMenu(props: IOfferingMenu) {
  return (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/offering/${props.offering.OfferingID}/financial`}>Offering Financial</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to={`/offering/${props.offering.OfferingID}/requisite`}>Requisite Management</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/offering/${props.offering.OfferingID}/catalog`}>Catalogs</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`/offering/${props.offering.OfferingID}/tag`}>Offering Tag</Link>
      </Menu.Item>
      {props.offering.HasApprovalProcess && (
        <Menu.Item key="4">
          <Link to={`/offering/${props.offering.OfferingID}/approval`}>Offering Approval</Link>
        </Menu.Item>
      )}
      <Menu.Item key="5">
        <Link to={`/offering/${props.offering.OfferingID}/instructor`}>Qualified Instructors</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to={`/offering/${props.offering.OfferingID}/section`}>Section</Link>
      </Menu.Item>
    </Menu>
  )
}
