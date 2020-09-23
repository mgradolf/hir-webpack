import React from "react"
import { Button, Menu } from "antd"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateSectionModal } from "~/store/ModalState"

interface ISectionMenu {
  section: { [key: string]: any }
  openCreateSectionModal?: (SectionID: number) => void
}
function SectionMenu(props: ISectionMenu) {
  return (
    <Menu>
      <Menu.Item key="-1">
        <Button
          type="link"
          onClick={() => props.openCreateSectionModal && props.openCreateSectionModal(props.section.SectionID)}
        >
          Edit
        </Button>
      </Menu.Item>
      <Menu.Item key="0">
        <Link to={`/section/${props.section.SectionID}/seatgroup`}>Seatgroup</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to={`/section/${props.section.SectionID}/budget`}>Budget</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/section/${props.section.SectionID}/schedule`}>Schedule</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/section/${props.section.SectionID}/catalog`}>Catalog</Link>
      </Menu.Item>
    </Menu>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateSectionModal: (SectionID?: number) => dispatch(showCreateSectionModal(true, { SectionID }))
  }
}

export default connect(null, mapDispatchToProps)(SectionMenu)
