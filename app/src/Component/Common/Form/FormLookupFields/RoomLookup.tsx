import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { RoomeSearchMeta } from "~/TableSearchMeta/Room/RoomSearchMeta"
import { getRoomTableColumns } from "~/TableSearchMeta/Room/RoomTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function RoomLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Room"
      valueField="RoomID"
      displayField="Name"
      {...getRoomTableColumns(true)}
      meta={RoomeSearchMeta as IField[]}
      metaName="RoomeSearchMeta"
      {...props}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Room", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
