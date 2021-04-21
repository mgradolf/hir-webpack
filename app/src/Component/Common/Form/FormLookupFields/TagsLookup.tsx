import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getUserTableColumns } from "~/TableSearchMeta/User/UserTableColumns"
import { TagsSearchMeta } from "~/TableSearchMeta/Tags/TagsSearchMeta"

export function TagsLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select tag"
      displayKey="Name"
      searchFieldName="Name"
      meta={TagsSearchMeta as IField[]}
      metaName="TagsSearchMeta"
      {...props}
      {...getUserTableColumns(true)}
      valueKey={props.valueKey || "TagID"}
    />
  )
}
