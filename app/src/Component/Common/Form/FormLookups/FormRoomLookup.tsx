import { FormInstance } from "antd/lib/form"
import * as React from "react"
import { FormLookupOpenButton } from "~/Component/Common/Form/FormLookupOpenButton"
import { RoomeSearchMeta } from "~/FormMeta/Room/RoomSearchMeta"
import { getRoomTableColumns } from "~/FormMeta/Room/RoomTableColumns"

export function FormRoomLookupButton(props: { formInstance: FormInstance; onCloseModal?: (Section: any) => void }) {
  return (
    <FormLookupOpenButton
      lookupModalTitle="Select Room"
      valueField="RoomID"
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
