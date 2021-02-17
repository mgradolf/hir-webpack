import * as React from "react"
import { DiscountProgramsSearchMeta } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsSearchMeta"
import { getDiscountProgramsTableColumns } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsTableColumns"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"

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
