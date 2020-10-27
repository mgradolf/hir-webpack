import { Col, Form, Row, Checkbox, Select, Typography } from "antd"
import React, { useState, useEffect } from "react"

import {
  findPossibleBuildings,
  findPossibleRooms,
  findPossibleSites
} from "~/ApiServices/BizApi/scheduling/schedulingIF"
import {
  IFilterFieldComponent,
  IFilterGenericComponentProps,
  InputCol,
  LabelCol
} from "~/Component/Common/SearchFilters/common"
import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"

const { Text } = Typography
const { Option } = Select

export default function RoomFilter(props: IFilterGenericComponentProps<IFilterFieldComponent> & { key: number }) {
  const { show, value, toggleCheckboxHandler, filterValueChanged, isChecked } = props
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
  }, [])

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

  useEffect(() => {
    function resetOptionsOfDependentFields() {
      setBuildings([])
      setRooms([])
    }

    if (!props.show.SiteID) {
      resetOptionsOfDependentFields()
    }
  }, [props.show.SiteID])

  const handleSiteChange = (value: number) => {
    setBuildings([])
    setRooms([])
    filterValueChanged({ SiteID: value, BuildingID: "", RoomID: "" })
  }

  const handleBuildingChange = (value: number) => {
    setRooms([])
    filterValueChanged({ BuildingID: value, RoomID: "" })
  }

  function renderRoomFilterChecked() {
    return (
      <Col style={{ paddingLeft: 0 }}>
        <Row>
          <LabelCol>
            <Checkbox checked={show.SiteID} onChange={toggleCheckboxHandler(["SiteID", "BuildingID", "RoomID"])}>
              Site
            </Checkbox>
          </LabelCol>
          <InputCol className={show.SiteID ? styles.offeringFilterField : "hidden"}>
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
          </InputCol>
        </Row>
        {buildings.length > 0 && (
          <Row>
            <LabelCol className={show.SiteID ? styles.offeringFilterField : "hidden"}>
              <Text>Building</Text>
            </LabelCol>
            <InputCol className={show.SiteID ? styles.offeringFilterField : "hidden"}>
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
            </InputCol>
          </Row>
        )}
        {rooms.length > 0 && !hideRoomDropdown && (
          <Row>
            <LabelCol className={show.SiteID ? styles.offeringFilterField : "hidden"}>
              <Text>Room</Text>
            </LabelCol>
            <InputCol className={show.SiteID ? styles.offeringFilterField : "hidden"}>
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
        )}
      </Col>
    )
  }

  function renderRoomFilterUnchecked() {
    return (
      <Col>
        <Form.Item name="SiteID" label="Site" labelCol={{ span: 6 }}>
          <Select aria-label="Site Select">
            {sites.map(({ Name: label, SiteID: value }, i) => (
              <Option value={value} key={`${value}_${i}`}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {buildings.length > 0 && (
          <Form.Item name="BuildingID" label="Building" labelCol={{ span: 6 }}>
            <Select aria-label="Building Select">
              {buildings.map(({ Name: label, BuildingID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {rooms.length > 0 && !hideRoomDropdown && (
          <Form.Item name="RoomID" label="Room" labelCol={{ span: 6 }}>
            <Select aria-label="Room Select">
              {rooms.map(({ Name: label, RoomID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Col>
    )
  }

  return isChecked ? renderRoomFilterChecked() : renderRoomFilterUnchecked()
}
