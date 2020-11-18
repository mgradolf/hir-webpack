import { Col, Select } from "antd"
import React, { useState, useEffect } from "react"

import {
  findPossibleBuildings,
  findPossibleRooms,
  findPossibleSites
} from "~/ApiServices/BizApi/scheduling/schedulingIF"
import {
  IFilterFieldComponent,
  IFilterGenericComponentProps,
  SearchComponentWrapper
} from "~/Component/Common/SearchFilters/common"
const { Option } = Select

export default function RoomFilter(props: IFilterGenericComponentProps<IFilterFieldComponent> & { key: number }) {
  const [sites, setSites] = useState<any[]>([])
  const [buildings, setBuildings] = useState<any[]>([])
  const [rooms, setRooms] = useState<any[]>([])

  const [siteId, setSiteId] = useState<any>()
  const [buildingId, setBuildingId] = useState<any>()

  useEffect(() => {
    async function loadSites() {
      const res = await findPossibleSites()
      if (Array.isArray(res.data)) {
        setSites(res.data)
      }
    }

    loadSites()
  }, [props.isCheckeble])

  useEffect(() => {
    async function loadBuildings() {
      console.log("siteId ", siteId)
      const res = await findPossibleBuildings([siteId])
      if (Array.isArray(res.data)) {
        setBuildings(res.data)
      }
    }

    if (siteId !== "") {
      loadBuildings()
    }
  }, [siteId])

  useEffect(() => {
    async function loadRooms() {
      const res = await findPossibleRooms([buildingId])
      if (Array.isArray(res.data)) {
        setRooms(res.data)
      }
    }

    if (buildingId !== "") {
      loadRooms()
    }
  }, [buildingId])

  // useEffect(() => {
  //   function resetOptionsOfDependentFields() {
  //     setBuildings([])
  //     setRooms([])
  //   }

  // if (!props.show.SiteID) {
  //   resetOptionsOfDependentFields()
  // }
  // }, [])

  const handleSiteChange = (value: number) => {
    setBuildings([])
    setRooms([])
    setSiteId(value)
    setBuildingId(undefined)
    props.formInstance.setFieldsValue({ SiteID: value })
    props.formInstance.setFieldsValue({ BuildingID: "" })
    props.formInstance.setFieldsValue({ RoomID: "" })
    console.log("site value changed ", value)
  }

  const handleBuildingChange = (value: number) => {
    setRooms([])
    setBuildingId(value)
    props.formInstance.setFieldsValue({ BuildingID: value })
    props.formInstance.setFieldsValue({ RoomID: "" })
  }

  function renderRoomFilterChecked() {
    return (
      <Col style={{ paddingLeft: 0 }}>
        {sites.length && (
          <SearchComponentWrapper {...props} label="Select Site" fieldName="SiteID">
            <Select aria-label="Site Select" style={{ width: 250 }} onChange={handleSiteChange}>
              {sites.map(({ Name: label, SiteID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchComponentWrapper>
        )}
        {buildings.length > 0 && (
          <SearchComponentWrapper {...props} label="Select Building" fieldName="BuildingID">
            <Select aria-label="Building Select" style={{ width: 250 }} onChange={handleBuildingChange}>
              {buildings.map(({ Name: label, BuildingID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchComponentWrapper>
        )}
        {/* {rooms.length > 0 || (props.extraProps && !props.extraProps.hideRoomDropdown) && ( */}
        {rooms.length > 0 && (
          <SearchComponentWrapper {...props} label="Select Room" fieldName="RoomID">
            <Select aria-label="Room Select" style={{ width: 250 }}>
              {rooms.map(({ Name: label, RoomID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchComponentWrapper>
        )}
      </Col>
    )
  }

  return renderRoomFilterChecked() // : renderRoomFilterUnchecked()
}
