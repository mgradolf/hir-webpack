import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { RoomeSearchMeta } from "~/TableSearchMeta/Room/RoomSearchMeta"
import { getRoomTableColumns } from "~/TableSearchMeta/Room/RoomTableColumns"

export function RoomLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Room"
      valueKey="RoomID"
      displayKey="Name"
      placeholder="Search By Room Name"
      {...getRoomTableColumns(true)}
      meta={RoomeSearchMeta as IField[]}
      metaName="RoomeSearchMeta"
      {...props}
    />
  )
}
