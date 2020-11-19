import * as React from "react"
import { InstructorSearchMeta } from "~/FormMeta/Instructor/InstructorSearchMeta"
import { getInstructorTableColumns } from "~/FormMeta/Instructor/InstructorTableColumns"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"

interface IInstructorProps {
  offeringID: number
  rowData: Array<any>
  onClose: (items?: any[]) => void
}

export function AddInstructorModal({ offeringID, rowData, onClose }: IInstructorProps) {
  return (
    <LookupModal
      meta={InstructorSearchMeta}
      {...getInstructorTableColumns(true)}
      title="Add Instructor"
      isArray={true}
      closeModal={onClose}
    />
  )
}
