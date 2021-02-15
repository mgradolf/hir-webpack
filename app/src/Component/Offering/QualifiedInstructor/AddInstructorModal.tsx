import * as React from "react"
import { InstructorSearchMeta } from "~/TableSearchMeta/Instructor/InstructorSearchMeta"
import { getInstructorTableColumns } from "~/TableSearchMeta/Instructor/InstructorTableColumns"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"

interface IInstructorProps {
  CanTeachOfferingID?: number
  onClose: (items?: any[]) => void
}

export function AddInstructorModal({ onClose, CanTeachOfferingID }: IInstructorProps) {
  return (
    <LookupModal
      meta={InstructorSearchMeta}
      defaultFormValue={CanTeachOfferingID ? { CanTeachOfferingID } : {}}
      {...getInstructorTableColumns(true)}
      title="Add Instructor"
      isArray={true}
      closeModal={onClose}
    />
  )
}
