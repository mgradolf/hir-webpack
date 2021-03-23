import React, { useState } from "react"
import { Button } from "antd"
import SectionFormModal from "~/Component/Feature/Section/CreateEdit/SectionFormModal"

interface ISectionEditLinkProp {
  section: { [key: string]: any }
  PrimaryType: boolean | false
  style?: { [key: string]: string }
}
export default function SectionEditLink(props: ISectionEditLinkProp) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Button
        style={props.style}
        type={props.PrimaryType ? "ghost" : "link"}
        onClick={() => {
          setOpenModal(true)
        }}
      >
        Edit
      </Button>
      {openModal && (
        <SectionFormModal
          OfferingID={props.section.OfferingID}
          SectionID={props.section.SectionID}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  )
}
