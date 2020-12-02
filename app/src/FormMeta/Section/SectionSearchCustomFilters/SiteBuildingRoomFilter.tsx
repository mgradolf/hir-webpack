import React, { useEffect, useState } from "react"
import {
  findPossibleBuildings,
  findPossibleRooms,
  findPossibleSites
} from "~/ApiServices/BizApi/scheduling/schedulingIF"
import { DROPDOWN, IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { DropDownInputType } from "~/Component/Common/SearchFilters/SearchDropDown"
// import SearchDropDown from "~/Component/Common/SearchFilters/SearchDropDown"

export const SiteBuildingRoomFilter = (props: IFilterGenericComponentProps<IFilterFieldComponent>) => {
  const [sites, setSites] = useState<any[]>([])
  const [buildings, setBuildings] = useState<any[]>([])
  const [rooms, setRooms] = useState<any[]>([])

  useEffect(() => {
    findPossibleSites().then((x) => {
      if (x.success) setSites(x.data)
    })
  }, [])

  const loadBuildings = (SiteID: number) => {
    if (SiteID) {
      findPossibleBuildings(SiteID).then((x) => {
        if (x.success) setBuildings(x.data)
      })
    } else {
      setBuildings([])
      setRooms([])
    }
  }

  const loadRooms = (BuildingID: number) => {
    if (BuildingID) {
      findPossibleRooms(BuildingID).then((x) => {
        if (x.success) setRooms(x.data)
      })
    } else {
      setRooms([])
    }
  }
  return (
    <>
      {sites.length > 0 && (
        <DropDownInputType
          label="Sites"
          inputType={DROPDOWN}
          options={sites}
          fieldName="SiteID"
          displayKey="Name"
          valueKey="SiteID"
          formInstance={props.formInstance}
          onChangeCallback={(e) => {
            console.log("site selected ", e)
            loadBuildings(e)
          }}
        />
      )}
      {buildings.length > 0 && (
        <DropDownInputType
          label="Building"
          inputType={DROPDOWN}
          options={buildings}
          fieldName="BuildingID"
          displayKey="Name"
          valueKey="BuildingID"
          formInstance={props.formInstance}
          onChangeCallback={(e) => {
            console.log("site selected ", e)
            loadRooms(e)
          }}
        />
      )}
      {rooms.length > 0 && (
        <DropDownInputType
          label="Room"
          inputType={DROPDOWN}
          options={rooms}
          fieldName="RoomID"
          displayKey="Name"
          valueKey="RoomID"
          formInstance={props.formInstance}
        />
      )}
    </>
  )
}
