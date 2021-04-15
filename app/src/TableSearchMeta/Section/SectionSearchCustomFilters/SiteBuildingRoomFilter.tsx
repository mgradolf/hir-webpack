import React, { useEffect, useState } from "react"
import {
  findPossibleBuildings,
  findPossibleRooms,
  findPossibleSites
} from "~/ApiServices/BizApi/scheduling/schedulingIF"
import { IGeneratedField } from "~/Component/Common/Form/common"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"

export const SiteBuildingRoomFilter = (props: IGeneratedField) => {
  const [sites, setSites] = useState<any[]>([])
  const [buildings, setBuildings] = useState<any[]>([])
  const [rooms, setRooms] = useState<any[]>([])

  useEffect(() => {
    findPossibleSites({}).then((x) => {
      if (x.success) {
        const options: any[] = []
        x.data.map((y: any) => {
          options.push({ label: y.Name, value: y.SiteID })
          return options
        })
        setSites(options)
      }
    })
  }, [])

  const loadBuildings = (SiteID: number) => {
    if (SiteID) {
      findPossibleBuildings({ SiteID }).then((x) => {
        if (x.success) {
          const options: any[] = []
          x.data.map((y: any) => {
            options.push({ label: y.Name, value: y.BuildingID })
            return options
          })
          setBuildings(options)
        }
      })
    } else {
      setBuildings([])
      setRooms([])
    }
  }

  const loadRooms = (BuildingID: number) => {
    if (BuildingID) {
      findPossibleRooms({ BuildingID }).then((x) => {
        if (x.success) {
          const options: any[] = []
          x.data.map((y: any) => {
            options.push({ label: y.Name, value: y.RoomID })
            return options
          })
          setRooms(options)
        }
      })
    } else {
      setRooms([])
    }
  }
  return (
    <>
      {sites.length > 0 && (
        <FormDropDown
          label="Sites"
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
        <FormDropDown
          label="Building"
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
        <FormDropDown
          label="Room"
          options={rooms}
          fieldName="RoomID"
          displayKey="Name"
          valueKey="RoomID"
          formInstance={props.formInstance}
          onChangeCallback={props.onSelectedItems}
        />
      )}
    </>
  )
}
