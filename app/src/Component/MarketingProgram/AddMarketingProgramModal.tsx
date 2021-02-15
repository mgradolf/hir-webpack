import * as React from "react"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"
import { getMarketingProgramTableColumns } from "~/TableSearchMeta/MarketingProgram/MarketingProgramTableColumns"
import { MarketingProgramSearchMeta } from "~/TableSearchMeta/MarketingProgram/MarketingProgramSearchMeta"

interface IInstructorProps {
  onClose: (items?: any[]) => void
}

export default function AddMarketingProgramModal({ onClose }: IInstructorProps) {
  return (
    <LookupModal
      meta={MarketingProgramSearchMeta}
      {...getMarketingProgramTableColumns()}
      title="Add Marketing Program"
      isArray={true}
      closeModal={onClose}
    />
  )
}
