import * as React from "react"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { getResourceTableColumns } from "~/TableSearchMeta/Resource/ResourceTableColumns"
import { ResourceSearchMeta } from "~/TableSearchMeta/Resource/ResourceSearchMeta"

interface IInstructorProps {
  onClose: (items?: any[]) => void
}

export default function AddResourceModal({ onClose }: IInstructorProps) {
  return (
    <LookupModal
      meta={ResourceSearchMeta}
      metaName="ResourceSearchMeta"
      {...getResourceTableColumns()}
      title="Add Resource"
      isArray={true}
      closeModal={onClose}
    />
  )
}
