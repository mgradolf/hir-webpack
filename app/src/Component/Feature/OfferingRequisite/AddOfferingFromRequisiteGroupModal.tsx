import * as React from "react"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { OfferingSearchMeta } from "~/TableSearchMeta/Offering/OfferingSearchMeta"
import { getOfferingTableColumns } from "~/TableSearchMeta/Offering/OfferingTableColumns"

interface IOfferingRequisiteGroupProps {
  onClose: (items?: any[]) => void
}

export function AddOfferingFromRequisiteGroupModal({ onClose }: IOfferingRequisiteGroupProps) {
  return (
    <LookupModal
      meta={OfferingSearchMeta}
      metaName="OfferingSearchMeta"
      defaultFormValue={{}}
      {...getOfferingTableColumns(true)}
      title="Add Offering"
      isArray={true}
      closeModal={onClose}
    />
  )
}
