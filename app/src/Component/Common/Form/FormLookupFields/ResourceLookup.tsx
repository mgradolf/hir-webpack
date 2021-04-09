import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { ResourceSearchMeta } from "~/TableSearchMeta/Resource/ResourceSearchMeta"
import { getResourceTableColumns } from "~/TableSearchMeta/Resource/ResourceTableColumns"

export function ResourceLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Resource"
      valueKey={props.valueKey || "ResourceID"}
      displayKey="Name"
      placeholder="Search By Resouce Name"
      meta={ResourceSearchMeta as IField[]}
      metaName="ResourceSearchMeta"
      {...getResourceTableColumns()}
      {...props}
    />
  )
}
