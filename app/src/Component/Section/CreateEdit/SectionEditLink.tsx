import React, { useState } from "react"
import { Button } from "antd"
import SectionFormModal from "~/Component/Section/CreateEdit/SectionFormModal"

interface ISectionEditLinkProp {
  OfferingID: number
  SectionID: number
  PrimaryType: boolean | false
  style?: { [key: string]: string }
}
export default function SectionEditLink(props: ISectionEditLinkProp) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Button
        style={props.style}
        type={props.PrimaryType ? "primary" : "link"}
        onClick={() => {
          setOpenModal(true)
        }}
      >
        Edit
      </Button>
      {openModal && (
        <SectionFormModal
          OfferingID={props.OfferingID}
          SectionID={props.SectionID}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  )
}
