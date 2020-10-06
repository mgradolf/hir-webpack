import { Button, Typography, Form } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useState, useEffect } from "react"
import RoomFinder from "~/Component/Section/RoomFinder"
import { IRoom } from "~/Component/Section/RoomFinder/RoomFinderModal"

import { findPossibleBuildings, findPossibleRooms, findPossibleSites } from "~/ApiServices/BizApi/schedule/scheduleIf"

const { Text } = Typography

interface ISectionDetailsRoomFinder {
  formInstance: FormInstance
  onSelectRoom?: (room: IRoom) => void
  onClearRoom?: () => void
}

enum FieldNames {
  SiteID = "SiteID",
  BuildingID = "BuildingID",
  RoomID = "RoomID"
}

function isSelectedRoomNotEmpty(room: IRoom | null): room is IRoom {
  return room !== null
}

function RoomFinderFormField(props: ISectionDetailsRoomFinder) {
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null)

  const [siteNameMap, setSiteNameMap] = useState<{ [key: number]: string }>({})
  const [buildingNameMap, setBuildingNameMap] = useState<{ [key: number]: string }>({})
  const [roomNameMap, setRoomNameMap] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    async function loadSites() {
      const res = await findPossibleSites()
      if (res.success && Array.isArray(res.data)) {
        const siteNameMap = res.data.reduce((typeMap, type) => ({ ...typeMap, [type.SiteID]: type.Name }), {})
        setSiteNameMap(siteNameMap)
      }
    }

    loadSites()
  }, [])

  const siteID = (selectedRoom && selectedRoom.SiteID) || undefined

  useEffect(() => {
    async function loadBuildings(siteID: number) {
      const res = await findPossibleBuildings(siteID)
      if (res.success && Array.isArray(res.data)) {
        const buildingNameMap = res.data.reduce((typeMap, type) => ({ ...typeMap, [type.BuildingID]: type.Name }), {})
        setBuildingNameMap(buildingNameMap)
      }
    }

    if (siteID) {
      loadBuildings(siteID)
    }
  }, [siteID])

  const buildingID = (selectedRoom && selectedRoom.BuildingID) || undefined

  useEffect(() => {
    async function loadRooms(buildingID: number) {
      const res = await findPossibleRooms(buildingID)
      if (res.success && Array.isArray(res.data)) {
        const roomNameMap = res.data.reduce((typeMap, type) => ({ ...typeMap, [type.RoomID]: type.RoomNumber }), {})
        setRoomNameMap(roomNameMap)
      }
    }

    if (buildingID) {
      loadRooms(buildingID)
    }
  }, [buildingID])

  const label = isSelectedRoomNotEmpty(selectedRoom)
    ? `${roomNameMap[selectedRoom.RoomID]}, ${buildingNameMap[selectedRoom.BuildingID]}, ${
        siteNameMap[selectedRoom.SiteID]
      }`
    : `No room selected`

  return (
    <Form.Item label="Room:" labelCol={{ span: 6 }}>
      <Text style={{ marginRight: "16px" }}>{label}</Text>
      <RoomFinder
        style={{ marginRight: "16px" }}
        onSelectRoom={(room) => {
          setSelectedRoom(room)
          props.formInstance.setFieldsValue({
            [FieldNames.SiteID]: room.SiteID,
            [FieldNames.BuildingID]: room.BuildingID || "",
            [FieldNames.RoomID]: room.RoomID || ""
          })

          if (props.onSelectRoom) {
            props.onSelectRoom(room)
          }
        }}
      />
      {selectedRoom !== null && (
        <Button
          aria-label="Clear Selected Room"
          onClick={() => {
            setSelectedRoom(null)
            props.formInstance.setFieldsValue({
              [FieldNames.SiteID]: "",
              [FieldNames.BuildingID]: "",
              [FieldNames.RoomID]: ""
            })

            if (props.onClearRoom) {
              props.onClearRoom()
            }
          }}
        >
          Clear Selected Room
        </Button>
      )}
    </Form.Item>
  )
}

export default RoomFinderFormField
