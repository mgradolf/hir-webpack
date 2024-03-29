import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { SectionCreateForm } from "~/Component/Feature/Section/Forms/SectionCreateForm"

interface ICreateNewSectionProps {
  OfferingID?: number
  closeModal: () => void
  helpKey?: string
}

export function SectionFormModal(props: ICreateNewSectionProps) {
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  return (
    <Modal
      width="800px"
      loading={false}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <SectionCreateForm
            helpKey={props.helpKey}
            OfferingID={props.OfferingID}
            handleCancel={() => props.closeModal && props.closeModal()}
            setApiCallInProgress={setApiCallInProgress}
          />
        </>
      }
    />
  )
}
