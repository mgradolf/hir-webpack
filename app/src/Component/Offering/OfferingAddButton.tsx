import React, { useState } from "react"
import { Button } from "antd"
import { addInstructorToOffering } from "~/ApiServices/Service/InstructorService"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"
import { eventBus, REFRESH_FACULTY_OFFERINGS_TAB } from "~/utils/EventBus"
import { getOfferingTableColumns } from "~/TableSearchMeta/Offering/OfferingTableColumns"
import { OfferingSearchMeta } from "~/TableSearchMeta/Offering/OfferingSearchMeta"

interface ICreateActionButtonProp {
  FacultyId?: number
}

export default function OfferingAddButton(props: ICreateActionButtonProp) {
  const [showModal, setShowModal] = useState(false)

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      items.map((x) => {
        addInstructorToOffering({ FacultyID: props.FacultyId, OfferingID: x.OfferingID }).then((x) => {
          if (x.success) eventBus.publish(REFRESH_FACULTY_OFFERINGS_TAB)
        })
        return true
      })
      setShowModal(false)
    } else {
      setShowModal(false)
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => setShowModal(true)}>
        + Add Offering
      </Button>
      {showModal && (
        <LookupModal
          title="Select Offering"
          isArray={true}
          closeModal={closeModal}
          {...getOfferingTableColumns(true)}
          meta={OfferingSearchMeta}
          defaultFormValue={{}}
        />
      )}
    </>
  )
}
