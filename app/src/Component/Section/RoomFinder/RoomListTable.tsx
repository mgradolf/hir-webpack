import { Row, Col } from "antd"
import React, { useState, useEffect } from "react"

import { findPossibleBuildings } from "~/ApiServices/BizApi/schedule/scheduleIf"
import { getRoomTypes } from "~/ApiServices/Service/RefLookupService"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import { ITableWrapperProps } from "~/Component/Section/SectionTable"

function RoomListTable(props: ITableWrapperProps & { extraData: { SiteID: number } }) {
  const [roomTypesMap, setRommTypesMap] = useState<{ [key: number]: string } | null>(null)
  const [buildingNameMap, setBuildingNameMap] = useState<{ [key: number]: string } | null>(null)

  useEffect(() => {
    async function loadRoomTypes() {
      const res = await getRoomTypes()
      if (res.success && Array.isArray(res.data)) {
        const typesMap = res.data.reduce((typeMap, type) => ({ ...typeMap, [type.ID]: type.Name }), {})
        setRommTypesMap(typesMap)
      }
    }
    loadRoomTypes()
  }, [])

  useEffect(() => {
    async function loadBuildings(siteID: number) {
      const res = await findPossibleBuildings(siteID)
      if (res.success && Array.isArray(res.data)) {
        const buildingNameMap = res.data.reduce((typeMap, type) => ({ ...typeMap, [type.BuildingID]: type.Name }), {})
        setBuildingNameMap(buildingNameMap)
      }
    }

    loadBuildings(props.extraData.SiteID)
  }, [props.extraData.SiteID])

  const columns = [
    {
      title: "Room Number",
      dataIndex: "RoomNumber",
      key: "RoomNumber"
    },
    {
      title: "Room Name",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "Type",
      dataIndex: "RoomUseTypeID",
      key: "RoomUseTypeID",
      render: (typeID: number) => (typeID !== undefined && roomTypesMap !== null ? roomTypesMap[typeID] : "")
    },
    {
      title: "Building",
      dataIndex: "BuildingID",
      key: "BuildingID",
      render: (buildingID: number) =>
        buildingID !== undefined && buildingNameMap !== null ? buildingNameMap[buildingID] : ""
    },
    {
      title: "Floor",
      dataIndex: "oca",
      key: "oca"
    },
    {
      title: "Capacity",
      dataIndex: "Capacity",
      key: "Capacity"
    }
  ]

  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {display && (
          <Row>
            <Col span="8">Floor:</Col>
            <Col span="16">{data.oca}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Capacity:</Col>
            <Col span="16">{data.Capacity}</Col>
          </Row>
        )}
      </div>
    )
  }

  return (
    <ResponsiveTable
      id={props.id}
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      breakpoints={["xxl"]}
      responsiveColumnIndices={[4, 5]}
      rowSelection={props.rowSelection}
      expandableRowRender={expandableRowRender}
      rowKey="RoomID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      scroll={{ y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 600 }}
    />
  )
}

export default RoomListTable
