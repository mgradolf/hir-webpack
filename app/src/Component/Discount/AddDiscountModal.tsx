import * as React from "react"
import { DiscountProgramsSearchMeta } from "~/FormMeta/DiscountPrograms/DiscountProgramsSearchMeta"
import { getDiscountProgramsTableColumns } from "~/FormMeta/DiscountPrograms/DiscountProgramsTableColumns"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"

interface ICreateNewDiscountProps {
  sectionId: number
  onClose: (items?: any[]) => void
}

export default function AddDiscountModal(props: ICreateNewDiscountProps) {
  return (
    <LookupModal
      meta={DiscountProgramsSearchMeta}
      {...getDiscountProgramsTableColumns()}
      title="Add Discount Programs"
      closeModal={props.onClose}
    />
  )
}
