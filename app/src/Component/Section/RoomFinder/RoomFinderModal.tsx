import { Button, Card, Col } from "antd"
import React, { useState, useEffect, useCallback } from "react"
import Modal from "~/Component/Common/Modal"
import zIndex from "~/utils/zIndex"
import RoomListTable from "~/Component/Section/RoomFinder/RoomListTable"
import RoomSearchFilters from "~/Component/Common/SearchFilters"
import RoomFinderMeta from "./RoomFinderMeta"
import { useDispatch } from "react-redux"

import { showRoomFinderModal } from "~/Store/ModalState"
import { findRoom } from "~/ApiServices/Service/SectionService"

export type RoomCriteria = {
  RoomUseTypeID: number
  SiteID: number
  BuildingID: number
  Floor: number
  MinCapacity: number
  MaxCapacity: number
  Accessible: boolean
} & { [key: string]: any }

const initialRoomCriteria: RoomCriteria = {
  RoomUseTypeID: 1,
  SiteID: 1,
  BuildingID: 3,
  Floor: 1,
  MinCapacity: 25,
  MaxCapacity: 50,
  Accessible: false
}

interface IRoomIndexSignature {
  [key: string]: number
}

export interface IRoom extends IRoomIndexSignature {
  SiteID: number
  BuildingID: number
  RoomID: number
}

interface IRoomFinderProps {
  onSelectRoom: (selectedRoom: IRoom) => void
}

function RoomFinderModal(props: IRoomFinderProps) {
  const [filterData, updateFilterData] = useState<RoomCriteria | null>(null)
  const [rooms, setRooms] = useState<Array<any> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null)

  const dispatch = useDispatch()
  const closeRoomFinderModal = useCallback(() => dispatch(showRoomFinderModal(false)), [dispatch])

  useEffect(() => {
    async function loadRooms() {
      setLoading(true)
      const params: { [key: string]: any } = filterData as RoomCriteria
      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (
          params[key] === undefined ||
          params[key] === null ||
          params[key] === "" ||
          params[key] === "0" ||
          params[key] === 0
        ) {
          delete params[key]
        }
      })
      const result = await findRoom(params)
      if (result.success && Array.isArray(result.data)) {
        setRooms(result.data)
      }
      setLoading(false)
    }

    if (filterData !== null) {
      loadRooms()
    }
  }, [filterData])

  useEffect(() => {
    function scrollToProgramList() {
      const roomListElement = document.getElementById("roomList")
      if (roomListElement) {
        roomListElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start"
        })
      }
    }

    if (rooms) {
      scrollToProgramList()
    }
  }, [rooms])

  const cardActions = [
    <Button onClick={closeRoomFinderModal}>Cancel</Button>,
    <Button
      disabled={selectedRoom === null}
      onClick={() => {
        props.onSelectRoom({
          SiteID: filterData?.SiteID || initialRoomCriteria.SiteID,
          BuildingID: filterData?.BuildingID || initialRoomCriteria.BuildingID,
          RoomID: selectedRoom !== null ? selectedRoom.RoomID : ""
        })
        closeRoomFinderModal()
      }}
    >
      Select
    </Button>
  ]

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys: any, selectedRows: any[]) => {
      setSelectedRoom(selectedRows[0])
    }
  }

  return (
    <Modal zIndex={zIndex.defaultModal + 1} showModal width="800px">
      <Card title="Select Program" actions={cardActions} style={{ maxHeight: "90vh", overflow: "auto" }}>
        <RoomSearchFilters
          title=""
          isModalView
          meta={RoomFinderMeta}
          initialFilter={
            filterData === null ? initialRoomCriteria : ((filterData as unknown) as { [key: string]: any })
          }
          visible
          isCheckeble={false}
          hideFilters={() => {
            closeRoomFinderModal()
            setSelectedRoom(null)
          }}
          onApplyChanges={(newFilterValues, newFilterCount) => {
            updateFilterData({ ...(filterData as RoomCriteria), ...newFilterValues })
          }}
        />
        {rooms && (
          <Col style={{ height: "65vh" }}>
            <RoomListTable
              id="roomList"
              dataSource={rooms}
              loading={loading}
              isModal
              rowSelection={rowSelection}
              extraData={{ SiteID: filterData !== null ? filterData.SiteID : initialRoomCriteria.SiteID }}
            />
          </Col>
        )}
      </Card>
    </Modal>
  )
}

export default RoomFinderModal
