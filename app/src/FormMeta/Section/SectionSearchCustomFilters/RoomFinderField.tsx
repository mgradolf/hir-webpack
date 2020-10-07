import { Row } from "antd"
import React from "react"
import { IFilterGenericComponentProps, IFilterFieldComponent } from "~/Component/Common/SearchFilters/common"
import RoomFinder from "~/Component/Section/RoomFinder"
import { IRoom } from "~/Component/Section/RoomFinder/RoomFinderModal"

function RoomFinderField(props: IFilterGenericComponentProps<IFilterFieldComponent> & { key: number }) {
  return (
    <Row key={props.key}>
      <RoomFinder
        onSelectRoom={(room: IRoom) => {
          props.filterValueChanged(room)
        }}
      />
    </Row>
  )
}

export default RoomFinderField
