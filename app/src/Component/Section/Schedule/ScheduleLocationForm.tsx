import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Switch, Divider } from "antd"
import {
  findPossibleBuildings,
  findPossibleRooms,
  findPossibleSites
} from "~/ApiServices/BizApi/scheduling/schedulingIF"
import "~/Sass/utils.scss"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/OldForm/FormError"
import { FormInstance } from "antd/lib/form"
import { IScheduleLocationFieldNames } from "~/Component/Section/Interfaces"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { saveLocations } from "~/ApiServices/Service/SectionService"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"
import { FormRoomLookupButton } from "~/Component/Common/OldForm/OldFormLookups/FormRoomLookup"

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
  labelCol: { span: 6 }
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
      const res = await findPossibleSites()
      if (Array.isArray(res.data)) {
        setSiteItems(res.data)
      }
    }

    loadSites()
  }, [])

  useEffect(() => {
    async function loadBuildings(siteID: number) {
      const res = await findPossibleBuildings([siteID])
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
      const res = await findPossibleRooms([buildingID])
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

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title="Update Location" actions={actions}>
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        onValuesChange={onValuesChange}
        className="modal-form"
      >
        <FormError errorMessages={errorMessages} />
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
        <FormRoomLookupButton
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
        <Form.Item
          name={props.fieldNames.ConflictCheck}
          label="Check for conflicts(slower)"
          {...layout}
          valuePropName="checked"
        >
          <Switch aria-label="Check for conflicts(slower)" />
        </Form.Item>
      </Form>
    </Card>
  )
}
