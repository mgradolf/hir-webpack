import { Button } from "antd"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { showRoomFinderModal } from "~/Store/ModalState"
import { IRoom } from "~/Component/Section/RoomFinder/RoomFinderModal"

function RoomFinder(props: { onSelectRoom: (room: IRoom) => void; style?: React.CSSProperties }) {
  const dispatch = useDispatch()
  const showRoomFinder: () => void = useCallback(
    () => dispatch(showRoomFinderModal(true, { onSelectRoomCallback: props.onSelectRoom })),
    [dispatch, props.onSelectRoom]
  )

  return (
    <Button style={props.style} aria-label="Room Finder" onClick={showRoomFinder}>
      Room Finder
    </Button>
  )
}

export default RoomFinder
