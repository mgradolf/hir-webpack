import * as React from "react"
import { InstructorSearchMeta } from "~/TableSearchMeta/Instructor/InstructorSearchMeta"
import { getInstructorTableColumns } from "~/TableSearchMeta/Instructor/InstructorTableColumns"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"

interface IInstructorProps {
  CanTeachOfferingID?: number
  onClose: (items?: any[]) => void
  helpkey?: string
}

export function AddInstructorModal({ onClose, CanTeachOfferingID, helpkey }: IInstructorProps) {
  return (
    <LookupModal
      meta={InstructorSearchMeta}
      metaName="InstructorSearchMeta"
      defaultFormValue={CanTeachOfferingID ? { CanTeachOfferingID } : {}}
      {...getInstructorTableColumns(true)}
      title="Add Instructor"
      isArray={true}
      closeModal={onClose}
      helpKey={helpkey}
    />
  )
}
