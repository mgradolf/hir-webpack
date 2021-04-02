import { FormInstance } from "antd/lib/form"
import * as React from "react"
import { OldFormLookupOpenButton } from "~/Component/Common/OldForm/OldFormLookupOpenButton"
import { RoomeSearchMeta } from "~/TableSearchMeta/Room/RoomSearchMeta"
import { getRoomTableColumns } from "~/TableSearchMeta/Room/RoomTableColumns"

export function OldFormRoomLookup(props: { formInstance: FormInstance; onCloseModal?: (Section: any) => void }) {
  return (
    <OldFormLookupOpenButton
      lookupModalTitle="Select Room"
      valueKey="RoomID"
      displayField="Name"
      fieldName="RoomID"
      label="Room"
      {...getRoomTableColumns(true)}
      meta={RoomeSearchMeta}
      formInstance={props.formInstance}
      onCloseModal={props.onCloseModal}
    />
  )
}

// onSelectRoom={(room) => {
//   setSelectedSiteID(room.SiteID)
//   setSelectedBuildingID(room.BuildingID)
// }}
// onClearRoom={() => {
//   setSelectedSiteID(null)
//   setSelectedBuildingID(null)
//   setBuildingItems([])
//   setRoomItems([])
// }}
