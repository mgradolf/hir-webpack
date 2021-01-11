import * as React from "react"
import { InstructorSearchMeta } from "~/FormMeta/Instructor/InstructorSearchMeta"
import { getInstructorTableColumns } from "~/FormMeta/Instructor/InstructorTableColumns"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"

interface IInstructorProps {
  OfferingID?: number
  onClose: (items?: any[]) => void
}

export function AddInstructorModal({ onClose, OfferingID }: IInstructorProps) {
  return (
    <LookupModal
      meta={InstructorSearchMeta}
      defaultFilter={OfferingID ? { CanTeachOfferingID: OfferingID } : {}}
      {...getInstructorTableColumns(true)}
      title="Add Instructor"
      isArray={true}
      closeModal={onClose}
    />
  )
}
