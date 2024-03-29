import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Divider, Row, Col } from "antd"
import {
  findPossibleBuildings,
  findPossibleRooms,
  findPossibleSites
} from "~/ApiServices/BizApi/scheduling/schedulingIF"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { FormInstance } from "antd/lib/form"
import { IScheduleLocationFieldNames } from "~/Component/Feature/Section/Interfaces"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { saveLocations } from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"
import { OldFormRoomLookup } from "~/Component/Common/OldForm/OldFormLookups/OldFormRoomLookup"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import "~/Sass/utils.scss"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

const { Option } = Select

interface IScheduleCreateFormProps {
  scheduleIds: any
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: FormInstance
  fieldNames: IScheduleLocationFieldNames
  initialFormValue: { [key in keyof IScheduleLocationFieldNames]: any }
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}
export default function ScheduleLocationForm(props: IScheduleCreateFormProps) {
  const [siteItems, setSiteItems] = useState<Array<any>>([])
  const [buildingItems, setBuildingItems] = useState<Array<any>>([])
  const [roomItems, setRoomItems] = useState<Array<any>>([])
  const [selectedSiteID, setSelectedSiteID] = useState<number | null>(null)
  const [selectedBuildingID, setSelectedBuildingID] = useState<number | null>(null)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    async function loadSites() {
      const res = await findPossibleSites({})
      if (Array.isArray(res.data)) {
        setSiteItems(res.data)
      }
    }

    loadSites()
  }, [])

  useEffect(() => {
    async function loadBuildings(siteID: number) {
      const res = await findPossibleBuildings({ SiteID: siteID })
      if (Array.isArray(res.data)) {
        setBuildingItems(res.data)
      }
    }

    if (selectedSiteID) {
      loadBuildings(selectedSiteID)
    }
  }, [selectedSiteID])

  useEffect(() => {
    async function loadRooms(buildingID: number) {
      const res = await findPossibleRooms({ BuildingID: buildingID })
      if (Array.isArray(res.data)) {
        setRoomItems(res.data)
      }
    }

    if (selectedBuildingID) {
      loadRooms(selectedBuildingID)
    }
  }, [selectedBuildingID])

  const onFormSubmission = async () => {
    setErrorMessages([])

    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue() as { [key in keyof IScheduleLocationFieldNames]: any }

    if (params.RoomID === "") {
      delete params.RoomID
    }

    if (params.BuildingID === "") {
      delete params.BuildingID
    }

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = saveLocations

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    if (changedValues[props.fieldNames.SiteID] !== undefined) {
      setSelectedSiteID(changedValues[props.fieldNames.SiteID])
      props.formInstance.setFieldsValue({ [props.fieldNames.BuildingID]: "", [props.fieldNames.RoomID]: "" })
    }

    if (changedValues[props.fieldNames.BuildingID] !== undefined) {
      setSelectedBuildingID(changedValues[props.fieldNames.BuildingID])
      props.formInstance.setFieldsValue({ [props.fieldNames.RoomID]: "" })
    }
  }

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>Update Location</Col>
          <Col>
            <HelpButton helpKey="sectionScheduleUpdateLocationForm" />
          </Col>
        </Row>
      }
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.handleCancel}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onFormSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        onValuesChange={onValuesChange}
        scrollToFirstError
        style={{
          maxHeight: "80vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.ScheduleIDs}>
          <Input aria-label="Schedule IDs" value={props.scheduleIds} />
        </Form.Item>
        <Form.Item name={props.fieldNames.SiteID} label="Site" {...layout}>
          <Select aria-label="Site Select">
            {siteItems.map(({ Name: label, SiteID: value }, i) => (
              <Option value={value} key={`${value}_${i}`}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {buildingItems.length > 0 && (
          <Form.Item name={props.fieldNames.BuildingID} label="Building" {...layout}>
            <Select aria-label="Building Select">
              {buildingItems.map(({ Name: label, BuildingID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {roomItems.length > 0 && (
          <Form.Item name={props.fieldNames.RoomID} label="Room" {...layout}>
            <Select aria-label="Room Select">
              {roomItems.map(({ Name: label, RoomID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Divider orientation="left">Search room via room finder</Divider>
        <OldFormRoomLookup
          formInstance={props.formInstance}
          // onSelectRoom={(room) => {
          //   setSelectedSiteID(room.SiteID)
          //   setSelectedBuildingID(room.BuildingID)
          // }}
          // onClearRoom={() => {
          //   setSelectedSiteID(null)
          //   setSelectedBuildingID(null)
          //   setBuildingItems([])
          //   setRoomItems([])
          // }}
        />
        <Divider />
        <FormMultipleRadio
          labelColSpan={6}
          wrapperColSpan={12}
          formInstance={props.formInstance}
          label={"Check for conflicts(slower)"}
          ariaLabel={"Check for conflicts(slower)"}
          fieldName={props.fieldNames.ConflictCheck}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
      </Form>
    </Card>
  )
}
