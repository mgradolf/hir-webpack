import { Col, Row, Checkbox, Select } from "antd"
import React, { useState, useEffect } from "react"

import { findPossibleBuildings, findPossibleRooms, findPossibleSites } from "~/ApiServices/BizApi/schedule/scheduleIf"
import {
  IFilterFieldComponent,
  IFilterGenericComponentProps,
  InputCol,
  LabelCol
} from "~/Component/SearchFilters/common"
import styles from "~/Component/SearchFilters/SearchFilters.module.scss"

const { Option } = Select
export default function RoomFilter(props: IFilterGenericComponentProps<IFilterFieldComponent> & { key: number }) {
  const { show, value, toggleCheckboxHandler, filterValueChanged } = props

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
  }, [])

  useEffect(() => {
    async function loadBuildings() {
      const res = await findPossibleBuildings(props.value.SiteID as number)
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
      const res = await findPossibleRooms(props.value.BuildingID as number)
      if (Array.isArray(res.data)) {
        setRooms(res.data)
      }
    }

    if (props.value.BuildingID !== "") {
      loadRooms()
    }
  }, [props.value.BuildingID])

  return (
    <Col key={props.key} style={{ paddingLeft: 0 }}>
      <Row>
        <LabelCol>
          <Checkbox checked={show.SiteID} onChange={toggleCheckboxHandler("SiteID")}>
            Site
          </Checkbox>
        </LabelCol>
        <InputCol className={show.SiteID ? styles.offeringFilterField : styles.hidden}>
          <Select
            aria-label="Site Select"
            style={{ width: 250 }}
            value={value.SiteID}
            onChange={(value) => {
              setBuildings([])
              setRooms([])
              filterValueChanged({ SiteID: value, BuildingID: "" })
            }}
          >
            {sites.map(({ Name: label, SiteID: value }, i) => (
              <Option value={value} key={`${value}_${i}`}>
                {label}
              </Option>
            ))}
          </Select>
        </InputCol>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={show.BuildingID} onChange={toggleCheckboxHandler("BuildingID")}>
            Building
          </Checkbox>
        </LabelCol>
        <InputCol className={show.BuildingID ? styles.offeringFilterField : styles.hidden}>
          <Select
            aria-label="Building Select"
            style={{ width: 250 }}
            value={value.BuildingID}
            onChange={(value) => {
              setRooms([])
              filterValueChanged({ BuildingID: value })
            }}
          >
            {buildings.map(({ Name: label, BuildingID: value }, i) => (
              <Option value={value} key={`${value}_${i}`}>
                {label}
              </Option>
            ))}
          </Select>
        </InputCol>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={show.RoomID} onChange={toggleCheckboxHandler("RoomID")}>
            Room
          </Checkbox>
        </LabelCol>
        <InputCol className={show.RoomID ? styles.offeringFilterField : styles.hidden}>
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
        </InputCol>
      </Row>
    </Col>
  )
}
