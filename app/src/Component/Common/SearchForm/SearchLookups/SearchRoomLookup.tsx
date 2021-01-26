import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { RoomeSearchMeta } from "~/FormMeta/Room/RoomSearchMeta"
import { getRoomTableColumns } from "~/FormMeta/Room/RoomTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function SearchRoomLookup(props: IGeneratedField) {
  return (
    <SearchLookupOpenButton
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
