import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { RoomeSearchMeta } from "~/FormMeta/Room/RoomSearchMeta"
import { getRoomTableColumns } from "~/FormMeta/Room/RoomTableColumns"

export function SearchRoomLookup(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Room"
      valueField="RoomID"
      displayField="Name"
      {...getRoomTableColumns(true)}
      meta={RoomeSearchMeta}
      {...props}
    />
  )
}
