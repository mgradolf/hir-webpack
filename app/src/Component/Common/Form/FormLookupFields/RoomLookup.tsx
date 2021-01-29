import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { RoomeSearchMeta } from "~/FormMeta/Room/RoomSearchMeta"
import { getRoomTableColumns } from "~/FormMeta/Room/RoomTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function RoomLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Room"
      valueField="RoomID"
      displayField="Name"
      {...getRoomTableColumns(true)}
      meta={RoomeSearchMeta as IField[]}
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
