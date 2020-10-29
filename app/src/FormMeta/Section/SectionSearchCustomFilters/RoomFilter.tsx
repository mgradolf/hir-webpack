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
  const { value, filterValueChanged, isCheckeble } = props
  const hideRoomDropdown = props.extraProps && props.extraProps.hideRoomDropdown

  const [sites, setSites] = useState<any[]>([])
  const [buildings, setBuildings] = useState<any[]>([])
  const [rooms, setRooms] = useState<any[]>([])

  useEffect(() => {
    async function loadSites() {
      const res = await findPossibleSites()
      if (Array.isArray(res.data)) {
        setSites(res.data)
      }
    }

    loadSites()
  }, [isCheckeble])

  useEffect(() => {
    async function loadBuildings() {
      const res = await findPossibleBuildings([props.value.SiteID as number])
      if (Array.isArray(res.data)) {
        setBuildings(res.data)
      }
    }

    if (props.value.SiteID !== "") {
      loadBuildings()
    }
  }, [props.value.SiteID])

  useEffect(() => {
    async function loadRooms() {
      const res = await findPossibleRooms([props.value.BuildingID as number])
      if (Array.isArray(res.data)) {
        setRooms(res.data)
      }
    }

    if (props.value.BuildingID !== "") {
      loadRooms()
    }
  }, [props.value.BuildingID])

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
    filterValueChanged({ SiteID: value, BuildingID: "", RoomID: "" })
    console.log("site value changed ", value)
  }

  const handleBuildingChange = (value: number) => {
    setRooms([])
    filterValueChanged({ BuildingID: value, RoomID: "" })
  }

  function renderRoomFilterChecked() {
    return (
      <Col style={{ paddingLeft: 0 }}>
        <SearchComponentWrapper {...props}>
          <Select
            aria-label="Site Select"
            style={{ width: 250 }}
            value={value.SiteID as number}
            onChange={handleSiteChange}
          >
            {sites.map(({ Name: label, SiteID: value }, i) => (
              <Option value={value} key={`${value}_${i}`}>
                {label}
              </Option>
            ))}
          </Select>
        </SearchComponentWrapper>
        {buildings.length > 0 && (
          <SearchComponentWrapper {...props}>
            <Select
              aria-label="Building Select"
              style={{ width: 250 }}
              value={value.BuildingID as number}
              onChange={handleBuildingChange}
            >
              {buildings.map(({ Name: label, BuildingID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchComponentWrapper>
        )}
        {rooms.length > 0 && !hideRoomDropdown && (
          <SearchComponentWrapper {...props}>
            <Select
              aria-label="Room Select"
              style={{ width: 250 }}
              value={value.RoomID}
              onChange={(value) => filterValueChanged({ RoomID: value })}
            >
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

  // function renderRoomFilterUnchecked() {
  //   return (
  //     <>
  //       <Row>
  //         <LabelCol>
  //           <Text>Site</Text>
  //         </LabelCol>
  //         <InputCol>
  //           <Select aria-label="Site Select" onChange={handleSiteChange}>
  //             {sites.map(({ Name: label, SiteID: value }, i) => (
  //               <Option value={value} key={`${value}_${i}`}>
  //                 {label}
  //               </Option>
  //             ))}
  //           </Select>
  //         </InputCol>
  //       </Row>
  //       {buildings.length > 0 && (
  //         <Row>
  //           <LabelCol>
  //             <Text>Building</Text>
  //           </LabelCol>
  //           <InputCol>
  //             <Select aria-label="Building Select" onChange={handleBuildingChange}>
  //               {buildings.map(({ Name: label, BuildingID: value }, i) => (
  //                 <Option value={value} key={`${value}_${i}`}>
  //                   {label}
  //                 </Option>
  //               ))}
  //             </Select>
  //           </InputCol>
  //         </Row>
  //       )}
  //       {rooms.length > 0 && !hideRoomDropdown && (
  //         <Row>
  //           <LabelCol>
  //             <Text>Building</Text>
  //           </LabelCol>
  //           <InputCol>
  //             <Select
  //               aria-label="Room Select"
  //               value={value.RoomID}
  //               onChange={(value) => filterValueChanged({ RoomID: value })}
  //             >
  //               {rooms.map(({ Name: label, RoomID: value }, i) => (
  //                 <Option value={value} key={`${value}_${i}`}>
  //                   {label}
  //                 </Option>
  //               ))}
  //             </Select>
  //           </InputCol>
  //         </Row>
  //       )}
  //     </>
  //   )
  // }

  return renderRoomFilterChecked() // : renderRoomFilterUnchecked()
}
