import * as React from "react"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { getMarketingProgramTableColumns } from "~/TableSearchMeta/MarketingProgram/MarketingProgramTableColumns"
import { MarketingProgramSearchMeta } from "~/TableSearchMeta/MarketingProgram/MarketingProgramSearchMeta"

interface IInstructorProps {
  onClose: (items?: any[]) => void
  helpkey?: string
}

export default function AddMarketingProgramModal({ onClose, helpkey }: IInstructorProps) {
  return (
    <LookupModal
      meta={MarketingProgramSearchMeta}
      metaName="MarketingProgramSearchMeta"
      {...getMarketingProgramTableColumns()}
      title="Add Marketing Program"
      isArray={true}
      closeModal={onClose}
      helpKey={helpkey}
    />
  )
}
