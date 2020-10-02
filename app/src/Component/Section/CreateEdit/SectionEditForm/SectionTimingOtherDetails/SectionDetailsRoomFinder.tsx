import { Button, Typography, Form } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useState, useEffect } from "react"
import RoomFinder from "~/Component/Section/RoomFinder"
import { IRoom } from "~/Component/Section/RoomFinder/RoomFinderModal"
import { ISectionDetailsFieldNames } from "~/Component/Section/CreateEdit/SectionEditForm/SectionDetails"

import { findPossibleBuildings, findPossibleRooms, findPossibleSites } from "~/ApiServices/BizApi/schedule/scheduleIf"

const { Text } = Typography

interface ISectionDetailsRoomFinder {
  formInstance: FormInstance
  fieldNames: ISectionDetailsFieldNames
}

function isSelectedRoomNotEmpty(room: IRoom | null): room is IRoom {
  return room !== null
}

function SectionDetailsRoomFinder(props: ISectionDetailsRoomFinder) {
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

  useEffect(() => {
    async function loadBuildings(siteID: number) {
      const res = await findPossibleBuildings(siteID)
      if (res.success && Array.isArray(res.data)) {
        const buildingNameMap = res.data.reduce((typeMap, type) => ({ ...typeMap, [type.BuildingID]: type.Name }), {})
        setBuildingNameMap(buildingNameMap)
      }
    }

    if (selectedRoom?.SiteID) {
      loadBuildings(selectedRoom?.SiteID)
    }
  }, [selectedRoom?.SiteID])

  useEffect(() => {
    async function loadRooms(buildingID: number) {
      const res = await findPossibleRooms(buildingID)
      if (res.success && Array.isArray(res.data)) {
        const roomNameMap = res.data.reduce((typeMap, type) => ({ ...typeMap, [type.RoomID]: type.RoomNumber }), {})
        setRoomNameMap(roomNameMap)
      }
    }

    if (selectedRoom?.BuildingID) {
      loadRooms(selectedRoom?.BuildingID)
    }
  }, [selectedRoom?.BuildingID])

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
            [props.fieldNames.SiteID]: room.SiteID,
            [props.fieldNames.BuildingID]: room.BuildingID || "",
            [props.fieldNames.RoomID]: room.RoomID || ""
          })
        }}
      />
      {selectedRoom !== null && (
        <Button
          aria-label="Clear Selected Room"
          onClick={() => {
            setSelectedRoom(null)
            props.formInstance.setFieldsValue({
              [props.fieldNames.SiteID]: "",
              [props.fieldNames.BuildingID]: "",
              [props.fieldNames.RoomID]: ""
            })
          }}
        >
          Clear Selected Room
        </Button>
      )}
    </Form.Item>
  )
}

export default SectionDetailsRoomFinder
