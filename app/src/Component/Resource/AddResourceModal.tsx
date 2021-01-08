import * as React from "react"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"
import { getResourceTableColumns } from "~/FormMeta/Resource/ResourceTableColumns"
import { ResourceSearchMeta } from "~/FormMeta/Resource/ResourceSearchMeta"

interface IInstructorProps {
  onClose: (items?: any[]) => void
}

export default function AddResourceModal({ onClose }: IInstructorProps) {
  return (
    <LookupModal
      meta={ResourceSearchMeta}
      {...getResourceTableColumns()}
      title="Add Resource"
      isArray={true}
      closeModal={onClose}
    />
  )
}
