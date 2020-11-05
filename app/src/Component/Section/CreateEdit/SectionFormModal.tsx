import React, { useState, useEffect } from "react"
import Modal from "~/Component/Common/Modal/index2"
import SectionCreateForm from "~/Component/Section/CreateEdit/SectionCreateForm"
import SectionEditForm from "~/Component/Section/CreateEdit/SectionEditForm"

import { getSectionById } from "~/ApiServices/Service/EntityService"

interface ICreateNewSectionProps {
  OfferingID: number
  SectionID?: number
  closeModal: () => void
}

export default function SectionModal(props: ICreateNewSectionProps) {
  const [showCreateForm, setShowCreateForm] = useState(!!props.OfferingID && !props.SectionID)
  const [showEditForm, setShowEditForm] = useState(!!props.OfferingID && !!props.SectionID)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [SectionID, setSectionID] = useState(props.SectionID)
  const [Section, setSection] = useState({})

  useEffect(() => {
    if (SectionID) {
      getSectionById(SectionID).then((x) => {
        if (x.success) {
          setSection(x.data)
        }
      })
    }
  }, [SectionID])
  return (
    <Modal
      width="800px"
      loading={false}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {showCreateForm && (
            <SectionCreateForm
              OfferingID={Number(props.OfferingID)}
              handleCancel={() => props.closeModal && props.closeModal()}
              handleSelected={(sectionId: number) => {
                setSectionID(sectionId)
                console.log("section created")
                setShowCreateForm(false)
                setShowEditForm(true)
              }}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
          {showEditForm && (
            <SectionEditForm
              Section={Section}
              handleCancel={() => props.closeModal && props.closeModal()}
              handleSubmit={() => {
                console.log("section edited")
                props.closeModal && props.closeModal()
              }}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
        </>
      }
    />
  )
}
