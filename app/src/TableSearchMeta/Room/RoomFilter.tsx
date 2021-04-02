import { Col, Select } from "antd"
import React, { useState, useEffect } from "react"

import { findPossibleBuildings, findPossibleSites } from "~/ApiServices/BizApi/scheduling/schedulingIF"
import { IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"
const { Option } = Select

export default function RoomFilter(props: IGeneratedField & { key: number }) {
  const [sites, setSites] = useState<any[]>([])
  const [buildings, setBuildings] = useState<any[]>([])

  const [siteId, setSiteId] = useState<any>()

  useEffect(() => {
    async function loadSites() {
      const res = await findPossibleSites({})
      if (Array.isArray(res.data)) {
        setSites(res.data)
      }
    }

    loadSites()
  }, [])

  useEffect(() => {
    async function loadBuildings() {
      console.log("siteId ", siteId)
      const res = await findPossibleBuildings({ SiteId: siteId })
      if (Array.isArray(res.data)) {
        setBuildings(res.data)
      }
    }

    if (siteId !== "") {
      loadBuildings()
    }
  }, [siteId])

  const handleSiteChange = (value: number) => {
    setBuildings([])

    setSiteId(value)

    props.formInstance.setFieldsValue({ SiteID: value })
    props.formInstance.setFieldsValue({ BuildingID: undefined })

    console.log("handleSiteChange ", value)
  }

  const handleBuildingChange = (value: number) => {
    props.formInstance.setFieldsValue({ BuildingID: value })
  }

  function renderRoomFilterChecked() {
    return (
      <Col style={{ paddingLeft: 0 }}>
        {sites.length && (
          <SearchFieldWrapper {...props} label="Select Site" fieldName="SiteID">
            <Select aria-label="Site Select" style={{ width: 250 }} onChange={handleSiteChange}>
              {sites.map(({ Name: label, SiteID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchFieldWrapper>
        )}
        {buildings.length > 0 && (
          <SearchFieldWrapper {...props} label="Select Building" fieldName="BuildingID">
            <Select aria-label="Building Select" style={{ width: 250 }} onChange={handleBuildingChange}>
              {buildings.map(({ Name: label, BuildingID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchFieldWrapper>
        )}
        {/* {rooms.length > 0 || (props.extraProps && !props.extraProps.hideRoomDropdown) && ( */}
        {/* {rooms.length > 0 && (
          <SearchFieldWrapper {...props} label="Select Room" fieldName="RoomID">
            <Select aria-label="Room Select" style={{ width: 250 }}>
              {rooms.map(({ Name: label, RoomID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchFieldWrapper>
        )} */}
      </Col>
    )
  }

  return renderRoomFilterChecked()
}
